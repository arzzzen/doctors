<?php

namespace AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;

/**
 * SpecialistType controller.
 *
 * @Route("/specialist-types")
 */
class SpecialistTypeController extends Controller
{

    /**
     * Lists all SpecialistType entities.
     *
     * @Route("/", name="specialist-types", options={"expose"=true})
     * @Method("GET")
     * @Rest\View
     */
    public function indexAction()
    {

        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('AppBundle:SpecialistType')->findAll();
        return $entities;
    }

    /**
     * Finds and displays a SpecialistType entity.
     *
     * @Route("/{id}", name="specialist-type_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('AppBundle:SpecialistType')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find SpecialistType entity.');
        }

        return array(
            'entity'      => $entity,
        );
    }
}
