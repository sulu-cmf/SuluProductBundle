<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\Product\BaseBundle\Entity;

use Sulu\Bundle\ContactBundle\Entity\Country;
use Sulu\Bundle\SecurityBundle\Entity\User;

/**
 * Defines the interface for a product
 * @package Sulu\Bundle\Product\BaseBundle\Entity
 */
interface ProductInterface
{
    /**
     * Get id
     *
     * @return integer
     */
    public function getId();

    /**
     * Set code
     *
     * @param string $code
     * @return BaseProduct
     */
    public function setCode($code);

    /**
     * Get code
     *
     * @return string
     */
    public function getCode();

    /**
     * Set number
     *
     * @param string $number
     * @return BaseProduct
     */
    public function setNumber($number);

    /**
     * Get number
     *
     * @return string
     */
    public function getNumber();

    /**
     * Set manufacturer
     *
     * @param string $manufacturer
     * @return BaseProduct
     */
    public function setManufacturer($manufacturer);

    /**
     * Get manufacturer
     *
     * @return string
     */
    public function getManufacturer();

    /**
     * Set created
     *
     * @param \DateTime $created
     * @return BaseProduct
     */
    public function setCreated($created);

    /**
     * Get created
     *
     * @return \DateTime
     */
    public function getCreated();

    /**
     * Set changed
     *
     * @param \DateTime $changed
     * @return BaseProduct
     */
    public function setChanged($changed);

    /**
     * Get changed
     *
     * @return \DateTime
     */
    public function getChanged();

    /**
     * Set manufacturerCountry
     *
     * @param Country $manufacturerCountry
     * @return BaseProduct
     */
    public function setManufacturerCountry(Country $manufacturerCountry = null);

    /**
     * Get manufacturerCountry
     *
     * @return Country
     */
    public function getManufacturerCountry();

    /**
     * Set type
     *
     * @param Type $type
     * @return BaseProduct
     */
    public function setType(Type $type);

    /**
     * Get type
     *
     * @return Type
     */
    public function getType();

    /**
     * Set template
     *
     * @param AttributeSet $template
     * @return BaseProduct
     */
    public function setAttributeSet(AttributeSet $template);

    /**
     * Get template
     *
     * @return AttributeSet
     */
    public function getAttributeSet();

    /**
     * Set status
     *
     * @param Status $status
     * @return BaseProduct
     */
    public function setStatus(Status $status = null);

    /**
     * Get status
     *
     * @return Status
     */
    public function getStatus();

    /**
     * Add relations
     *
     * @param ProductInterface $relations
     * @return BaseProduct
     */
    public function addRelation(ProductInterface $relations);

    /**
     * Remove relations
     *
     * @param ProductInterface $relations
     */
    public function removeRelation(ProductInterface $relations);

    /**
     * Get relations
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRelations();

    /**
     * Add upsells
     *
     * @param ProductInterface $upsells
     * @return BaseProduct
     */
    public function addUpsell(ProductInterface $upsells);

    /**
     * Remove upsells
     *
     * @param ProductInterface $upsells
     */
    public function removeUpsell(ProductInterface $upsells);

    /**
     * Get upsells
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUpsells();

    /**
     * Add crosssells
     *
     * @param ProductInterface $crosssells
     * @return ProductInterface
     */
    public function addCrosssell(ProductInterface $crosssells);

    /**
     * Remove crosssells
     *
     * @param ProductInterface $crosssells
     */
    public function removeCrosssell(ProductInterface $crosssells);

    /**
     * Get crosssells
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCrosssells();

    /**
     * Set changer
     *
     * @param User $changer
     * @return ProductInterface
     */
    public function setChanger(User $changer = null);

    /**
     * Get changer
     *
     * @return User
     */
    public function getChanger();

    /**
     * Set creator
     *
     * @param User $creator
     * @return ProductInterface
     */
    public function setCreator(User $creator = null);

    /**
     * Get creator
     *
     * @return User
     */
    public function getCreator();

    /**
     * Set parent
     *
     * @param ProductInterface $parent
     * @return ProductInterface
     */
    public function setParent(ProductInterface $parent = null);

    /**
     * Get parent
     *
     * @return ProductInterface
     */
    public function getParent();

    /**
     * Add children
     *
     * @param ProductInterface $children
     * @return ProductInterface
     */
    public function addChildren(ProductInterface $children);

    /**
     * Remove children
     *
     * @param ProductInterface $children
     */
    public function removeChildren(ProductInterface $children);

    /**
     * Get children
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getChildren();

    /**
     * Add attributes
     *
     * @param ProductAttribute $productAttributes
     * @return ProductInterface
     */
    public function addProductAttribute(ProductAttribute $productAttributes);

    /**
     * Remove attributes
     *
     * @param ProductAttribute $productAttributes
     */
    public function removeProductAttribute(ProductAttribute $productAttributes);

    /**
     * Get attributes
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getProductAttributes();

    /**
     * Add translations
     *
     * @param ProductTranslation $translations
     * @return ProductInterface
     */
    public function addTranslation(ProductTranslation $translations);

    /**
     * Remove translations
     *
     * @param ProductTranslation $translations
     */
    public function removeTranslation(ProductTranslation $translations);

    /**
     * Get translations
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTranslations();

    /**
     * Add extras
     *
     * @param Addon $addon
     * @return ProductInterface
     */
    public function addAddon(Addon $addon);

    /**
     * Remove extras
     *
     * @param Addon $addon
     */
    public function removeAddon(Addon $addon);

    /**
     * Get extras
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getAddons();

    /**
     * Add setProducts
     *
     * @param \Sulu\Bundle\Product\BaseBundle\Entity\ProductInterface $setProducts
     * @return BaseProduct
     */
    public function addSetProduct(\Sulu\Bundle\Product\BaseBundle\Entity\ProductInterface $setProducts);

    /**
     * Remove setProducts
     *
     * @param \Sulu\Bundle\Product\BaseBundle\Entity\ProductInterface $setProducts
     */
    public function removeSetProduct(\Sulu\Bundle\Product\BaseBundle\Entity\ProductInterface $setProducts);

    /**
     * Get setProducts
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSetProducts();
}