<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;

/**
 * Specialist controller.
 *
 * @Route("/specialist")
 */
class SpecialistController extends Controller
{

    /**
     * Lists all Specialist entities.
     *
     * @Route("/", name="specialist", options={"expose"=true}, requirements={"type_id"="\d+"}, )
     * @Method("GET")
     * @Rest\View
     */
    public function indexAction(Request $request)
    {
        $specialistRep = $this->getDoctrine()->getManager()->getRepository('AppBundle:Specialist');

        if ($request->query->has('type_id')) {
            $entities = $specialistRep->findBy(array('type' => $request->query->get('type_id')));
        } else {
            $entities = $specialistRep->findAll();
        }
        return $entities;
    }

    /**
     * Finds and displays a Specialist entity.
     *
     * @Route("/{id}", name="specialist_show", requirements={"id"="\d+"})
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('AppBundle:Specialist')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Specialist entity.');
        }

        return array(
            'entity'      => $entity,
        );
    }
}
