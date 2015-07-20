<?php

namespace AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AppBundle\Entity\SpecialistType;
use Symfony\Component\HttpFoundation\Response;

/**
 * SpecialistType controller.
 *
 * @Route("/specialist-type")
 */
class SpecialistTypeController extends Controller
{

    /**
     * Lists all SpecialistType entities.
     *
     * @Route("/", name="specialist-type", options={"expose"=true})
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {

        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('AppBundle:SpecialistType')->findAll();
        $types = $this->container->get('serializer')->serialize($entities, 'json');
        return new Response($types);
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
