<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\ProductBundle\Product;

use DateTime;
use Doctrine\Common\Persistence\ObjectManager;
use Sulu\Bundle\ProductBundle\Api\Product;
use Sulu\Bundle\ProductBundle\Api\Status;
use Sulu\Bundle\ProductBundle\Entity\AttributeSetRepository;
use Sulu\Bundle\ProductBundle\Entity\Product as ProductEntity;
use Sulu\Bundle\ProductBundle\Entity\AttributeSet;
use Sulu\Bundle\ProductBundle\Entity\StatusRepository;
use Sulu\Bundle\ProductBundle\Entity\Type;
use Sulu\Bundle\ProductBundle\Entity\TypeRepository;
use Sulu\Bundle\ProductBundle\Product\Exception\MissingProductAttributeException;
use Sulu\Bundle\ProductBundle\Product\Exception\ProductChildrenExistException;
use Sulu\Bundle\ProductBundle\Product\Exception\ProductDependencyNotFoundException;
use Sulu\Bundle\ProductBundle\Product\Exception\ProductNotFoundException;
use Sulu\Component\Rest\ListBuilder\Doctrine\FieldDescriptor\DoctrineFieldDescriptor;
use Sulu\Component\Rest\ListBuilder\Doctrine\FieldDescriptor\DoctrineJoinDescriptor;
use Sulu\Component\Security\UserRepositoryInterface;

class ProductManager implements ProductManagerInterface
{
    protected static $productEntityName = 'SuluProductBundle:Product';
    protected static $productTypeEntityName = 'SuluProductBundle:Type';
    protected static $productTypeTranslationEntityName = 'SuluProductBundle:TypeTranslation';
    protected static $productStatusEntityName = 'SuluProductBundle:Status';
    protected static $productStatusTranslationEntityName = 'SuluProductBundle:StatusTranslation';
    protected static $attributeSetEntityName = 'SuluProductBundle:AttributeSet';
    protected static $productTranslationEntityName = 'SuluProductBundle:ProductTranslation';

    /**
     * @var ProductRepositoryInterface
     */
    private $productRepository;

    /**
     * @var AttributeSetRepository
     */
    private $attributeSetRepository;

    /**
     * @var StatusRepository
     */
    private $statusRepository;

    /**
     * @var TypeRepository
     */
    private $typeRepository;

    /**
     * @var UserRepositoryInterface
     */
    private $userRepository;

    /**
     * @var ObjectManager
     */
    private $em;

    /**
     * Describes the fields, which are handled by this controller
     * @var DoctrineFieldDescriptor[]
     */
    protected $fieldDescriptors = array();

    public function __construct(
        ProductRepositoryInterface $productRepository,
        AttributeSetRepository $attributeSetRepository,
        StatusRepository $statusRepository,
        TypeRepository $typeRepository,
        UserRepositoryInterface $userRepository,
        ObjectManager $em
    ) {
        $this->productRepository = $productRepository;
        $this->attributeSetRepository = $attributeSetRepository;
        $this->statusRepository = $statusRepository;
        $this->typeRepository = $typeRepository;
        $this->userRepository = $userRepository;
        $this->em = $em;

        $this->initializeFieldDescriptors();
    }

    /**
     * {@inheritDoc}
     */
    public function getFieldDescriptors()
    {
        return $this->fieldDescriptors;
    }

    /**
     * {@inheritDoc}
     */
    public function getFieldDescriptor($key)
    {
        return $this->fieldDescriptors[$key];
    }

    /**
     * {@inheritDoc}
     */
    public function findByIdAndLocale($id, $locale)
    {
        $product = $this->productRepository->findByIdAndLocale($id, $locale);

        if ($product) {
            return new Product($product, $locale);
        } else {
            return null;
        }
    }

    /**
     * {@inheritDoc}
     */
    public function findAllByLocale($locale, $filter = array())
    {
        if (empty($filter)) {
            $products = $this->productRepository->findAllByLocale($locale);
        } else {
            $products = $this->productRepository->findByLocaleAndFilter($locale, $filter);
        }

        array_walk(
            $products,
            function (&$product) use ($locale) {
                $product = new Product($product, $locale);
            }
        );

        return $products;
    }

    /**
     * {@inheritDoc}
     */
    public function save(array $data, $locale, $userId, $id = null)
    {
        if ($id) {
            $product = $this->productRepository->findByIdAndLocale($id, $locale);

            if (!$product) {
                throw new ProductNotFoundException($id);
            }

            $product = new Product($product, $locale);
        } else {
            $product = new Product(new ProductEntity(), $locale);
        }

        $this->checkData($data, $id === null);

        $user = $this->userRepository->findUserById($userId);

        $product->setName($this->getProperty($data, 'name', $product->getName()));
        $product->setShortDescription($this->getProperty($data, 'shortDescription', $product->getShortDescription()));
        $product->setLongDescription($this->getProperty($data, 'longDescription', $product->getLongDescription()));
        $product->setCode($this->getProperty($data, 'code', $product->getCode()));
        $product->setNumber($this->getProperty($data, 'number', $product->getNumber()));
        $product->setManufacturer($this->getProperty($data, 'manufacturer', $product->getManufacturer()));
        $product->setCost($this->getProperty($data, 'cost', $product->getCost()));
        $product->setPriceInfo($this->getProperty($data, 'priceInfo', $product->getPriceInfo()));

        if (array_key_exists('attributeSet', $data) && array_key_exists('id', $data['attributeSet'])) {
            $attributeSetId = $data['attributeSet']['id'];
            /** @var AttributeSet $attributeSet */
            $attributeSet = $this->attributeSetRepository->find($attributeSetId);
            if (!$attributeSet) {
                throw new ProductDependencyNotFoundException(self::$attributeSetEntityName, $attributeSetId);
            }
            $product->setAttributeSet($attributeSet);
        }

        if (array_key_exists('parent', $data) && array_key_exists('id', $data['parent'])) {
            $parentId = $data['parent']['id'];
            /** @var ProductEntity $parentProduct */
            $parentProduct = $this->productRepository->findById($parentId);
            if (!$parentProduct) {
                throw new ProductDependencyNotFoundException(self::$productEntityName, $parentId);
            }
            $product->setParent($parentProduct);
        } else {
            $product->setParent(null);
        }

        if (array_key_exists('status', $data) && array_key_exists('id', $data['status'])) {
            $statusId = $data['status']['id'];
            /** @var Status $status */
            $status = $this->statusRepository->find($statusId);
            if (!$status) {
                throw new ProductDependencyNotFoundException(self::$productStatusEntityName, $statusId);
            }
            $product->setStatus($status);
        }

        if (array_key_exists('type', $data) && array_key_exists('id', $data['type'])) {
            $typeId = $data['type']['id'];
            /** @var Type $type */
            $type = $this->typeRepository->find($typeId);
            if (!$type) {
                throw new ProductDependencyNotFoundException(self::$productTypeEntityName, $typeId);
            }
            $product->setType($type);
        }

        $product->setChanged(new DateTime());
        $product->setChanger($user);

        if ($product->getId() == null) {
            $product->setCreated(new DateTime());
            $product->setCreator($user);
            $this->em->persist($product->getEntity());
        }

        $this->em->flush();

        return $product;
    }

    /**
     * {@inheritDoc}
     */
    public function delete($id, $userId)
    {
        $product = $this->productRepository->findById($id);

        if (!$product) {
            throw new ProductNotFoundException($id);
        }

        // do not allow to delete entity if child is existent
        if (count($product->getChildren()) > 0) {
            throw new ProductChildrenExistException($id);
        }

        $this->em->remove($product);
        $this->em->flush();
    }

    /**
     * Returns the entry from the data with the given key, or the given default value, if the key does not exist
     * @param array $data
     * @param string $key
     * @param string $default
     * @return mixed
     */
    private function getProperty(array $data, $key, $default = null)
    {
        return array_key_exists($key, $data) ? $data[$key] : $default;
    }

    private function initializeFieldDescriptors()
    {
        $this->fieldDescriptors['id'] = new DoctrineFieldDescriptor('id', 'id', self::$productEntityName);
        $this->fieldDescriptors['code'] = new DoctrineFieldDescriptor('code', 'code', self::$productEntityName);
        $this->fieldDescriptors['number'] = new DoctrineFieldDescriptor('number', 'number', self::$productEntityName);
        $this->fieldDescriptors['manufacturer'] = new DoctrineFieldDescriptor(
            'manufacturer', 'manufacturer', self::$productEntityName
        );
        $this->fieldDescriptors['cost'] = new DoctrineFieldDescriptor('cost', 'cost', self::$productEntityName);
        $this->fieldDescriptors['price'] = new DoctrineFieldDescriptor('price', 'price', self::$productEntityName);
        $this->fieldDescriptors['priceInfo'] = new DoctrineFieldDescriptor(
            'priceInfo', 'priceInfo', self::$productEntityName
        );
        $this->fieldDescriptors['created'] = new DoctrineFieldDescriptor(
            'created', 'created', self::$productEntityName
        );
        $this->fieldDescriptors['changed'] = new DoctrineFieldDescriptor(
            'changed', 'changed', self::$productEntityName
        );

        $this->fieldDescriptors['name'] = new DoctrineFieldDescriptor(
            'name',
            'name',
            self::$productTranslationEntityName,
            null,
            array(
                self::$productTranslationEntityName => new DoctrineJoinDescriptor(
                        self::$productTranslationEntityName,
                        self::$productEntityName . '.translations'
                    )
            )
        );
        $this->fieldDescriptors['shortDescription'] = new DoctrineFieldDescriptor(
            'shortDescription',
            'shortDescription',
            self::$productTranslationEntityName,
            null,
            array(
                self::$productTranslationEntityName => new DoctrineJoinDescriptor(
                        self::$productTranslationEntityName,
                        self::$productEntityName . '.translations'
                    )
            )
        );
        $this->fieldDescriptors['longDescription'] = new DoctrineFieldDescriptor(
            'longDescription',
            'longDescription',
            self::$productTranslationEntityName,
            null,
            array(
                self::$productTranslationEntityName => new DoctrineJoinDescriptor(
                        self::$productTranslationEntityName,
                        self::$productEntityName . '.translations'
                    )
            )
        );
        $this->fieldDescriptors['type'] = new DoctrineFieldDescriptor(
            'name',
            'type',
            self::$productTypeTranslationEntityName,
            null,
            array(
                self::$productTypeEntityName => new DoctrineJoinDescriptor(
                        self::$productTypeEntityName,
                        self::$productEntityName . '.type'
                    ),
                self::$productTypeTranslationEntityName => new DoctrineJoinDescriptor(
                        self::$productTypeTranslationEntityName, self::$productTypeEntityName . '.translations'
                    ),
            )
        );
        $this->fieldDescriptors['status'] = new DoctrineFieldDescriptor(
            'name',
            'status',
            self::$productStatusTranslationEntityName,
            null,
            array(
                self::$productStatusEntityName => new DoctrineJoinDescriptor(
                        self::$productStatusEntityName,
                        self::$productEntityName . '.status'
                    ),
                self::$productStatusTranslationEntityName => new DoctrineJoinDescriptor(
                        self::$productStatusTranslationEntityName, self::$productStatusEntityName . '.translations'
                    ),
            )
        );
    }

    private function checkData($data, $create)
    {
        $this->checkDataSet($data, 'number', $create);

        $this->checkDataSet($data, 'type', $create) && $this->checkDataSet($data['type'], 'id', $create);

        $this->checkDataSet($data, 'status', $create) && $this->checkDataSet($data['status'], 'id', $create);
    }

    private function checkDataSet(array $data, $key, $create)
    {
        $keyExists = array_key_exists($key, $data);

        if (($create && !($keyExists && $data[$key] !== null)) || (!$keyExists || $data[$key] === null)) {
            throw new MissingProductAttributeException($key);
        }

        return $keyExists;
    }
}