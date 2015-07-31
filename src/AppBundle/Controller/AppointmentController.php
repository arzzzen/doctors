<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AppBundle\Entity\Appointment;
use AppBundle\Form\AppointmentType;
use FOS\RestBundle\Controller\Annotations as Rest;

/**
 * Appointment controller.
 *
 * @Route("/appointments")
 */
class AppointmentController extends Controller
{

    /**
     * Lists all Appointment entities.
     *
     * @Route("/", name="appointments", options={"expose"=true})
     * @Method("GET")
     * @Rest\View
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('AppBundle:Appointment')->findAll();

        return $entities;
    }
    /**
     * Creates a new Appointment entity.
     *
     * @Route("/", name="appointment_create")
     * @Method("POST")
     * @Template("AppBundle:Appointment:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new Appointment();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('appointment_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a form to create a Appointment entity.
     *
     * @param Appointment $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(Appointment $entity)
    {
        $form = $this->createForm(new AppointmentType(), $entity, array(
            'action' => $this->generateUrl('appointment_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new Appointment entity.
     *
     * @Route("/new", name="appointment_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Appointment();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Appointment entity.
     *
     * @Route("/{id}", name="appointment_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('AppBundle:Appointment')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Appointment entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }
}
