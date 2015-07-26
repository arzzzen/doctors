<?php
namespace AppBundle\EventListener;

use ADesigns\CalendarBundle\Event\CalendarEvent;
use ADesigns\CalendarBundle\Entity\EventEntity;

/**
 * Add data after serialization
 *
 * @Service("app.eventlistener.calendareventlistener")
 * @Tag("calendar.load_events")
 */
class CalendarEventListener
{
    private $entityManager;

    public function __construct($container)
    {
        $this->container = $container;
    }

    public function loadEvents(CalendarEvent $calendarEvent)
    {
        $startDate = $calendarEvent->getStartDatetime();
        $endDate = $calendarEvent->getEndDatetime();

        // The original request so you can get filters from the calendar
        // Use the filter in your query for example

        $request = $calendarEvent->getRequest();
        $filter = $request->get('filter');


        // load events using your custom logic here,
        // for instance, retrieving events from a repository
        $companyEvents = $this->container->get('doctrine')->getEntityManager()->getRepository('AppBundle:Appointment')
            ->createQueryBuilder('appointemnt')
            ->where('appointemnt.startDatetime BETWEEN :startDate and :endDate AND appointemnt.specialist = :specialist_id')
            ->setParameter('startDate', $startDate->format('Y-m-d H:i:s'))
            ->setParameter('endDate', $endDate->format('Y-m-d H:i:s'))
            ->setParameter('specialist_id', $request->request->get('specialist_id'))
            ->getQuery()->getResult();

        // $companyEvents and $companyEvent in this example
        // represent entities from your database, NOT instances of EventEntity
        // within this bundle.
        //
        // Create EventEntity instances and populate it's properties with data
        // from your own entities/database values.

        foreach($companyEvents as $companyEvent) {
            $startDate = $companyEvent->getStartDatetime();
            $eventEntity = new EventEntity($companyEvent->getStartDatetime()->format($this->container->getParameter('date.format')),
                $companyEvent->getStartDatetime(),
                $companyEvent->getEndDatetime());
            //optional calendar event settings
            $eventEntity->setBgColor('#337ab7'); //set the background color of the event's label
            $eventEntity->setFgColor('#FFFFFF'); //set the foreground color of the event's label
            $eventEntity->setUrl('http://www.google.com'); // url to send user to when event label is clicked
            $eventEntity->setCssClass('my-custom-class'); // a custom class you may want to apply to event labels

            //finally, add the event to the CalendarEvent for displaying on the calendar
            $calendarEvent->addEvent($eventEntity);
        }
    }
}