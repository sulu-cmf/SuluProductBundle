<?php

namespace Sulu\Bundle\ProductBundle\Controller;

use Sulu\Bundle\ProductBundle\Api\Status;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class TemplateController extends Controller
{
    /**
     * Returns Template for product list
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function productListAction()
    {
        return $this->render('SuluProductBundle:Template:product.list.html.twig');
    }

    /**
     * Returns Template for product list
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function productFormAction()
    {
        /** @var Status[] $statuses */
        $statuses = $this->get('sulu_product.status_manager')->findAll('en'); // TODO use correct language

        $statusTitles = array();
        foreach ($statuses as $status) {
            $statusTitles[] = array(
                'id' => $status->getId(),
                'name' => $status->getName()
            );
        }

        return $this->render(
            'SuluProductBundle:Template:product.form.html.twig',
            array('status' => $statusTitles)
        );
    }

    /**
     * Returns Template for product import
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function productImportAction()
    {
        return $this->render(
            'SuluProductBundle:Template:product.import.html.twig'
        );
    }

    /**
     * Returns Template for attribute list
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function attributeListAction()
    {
        return $this->render(
            'SuluProductBundle:Template:attribute.list.html.twig'
        );
    }

    /**
     * Returns Template for attribute list
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function attributeFormAction()
    {

        $repository = $this->getDoctrine()
            ->getRepository('SuluProductBundle:AttributeType');
        $types = $repository->findAll();

        $attributeTypes = array();
        foreach ($types as $type) {
            $attributeTypes[] = array(
                'id'=>$type->getId(),
                'name'=>$type->getName()
            );
        }

        return $this->render(
            'SuluProductBundle:Template:attribute.form.html.twig',
            array(
                'attribute_types' => $attributeTypes
            )
        );
    }
}
