<?php

namespace AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AppBundle\Entity\Specialist;
use Symfony\Component\HttpFoundation\Response;

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
     * @Route("/t{type_id}", name="specialist", options={"expose"=true}, requirements={"type_id"="\d+"})
     * @Method("GET")
     * @Template()
     */
    public function indexAction($type_id)
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('AppBundle:Specialist')->findBy(array('type_id' => $type_id));
        $specialists = $this->container->get('serializer')->serialize($entities, 'json');
        return new Response($specialists);
    }

    /**
     * Finds and displays a Specialist entity.
     *
     * @Route("/{id}", name="specialist_show")
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
