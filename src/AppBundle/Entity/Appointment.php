<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * Appointment
 *
 * @ORM\Table()
 * @ORM\Entity
 * @ExclusionPolicy("All")
 */
class Appointment
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="Specialist", inversedBy="appointments")
     **/
    private $specialist;

    /**
     * @var integer
     *
     * @ORM\Column(name="patient_id", type="integer")
     */
    private $patientId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="start_datetime", type="datetime")
     * @Expose
     */
    private $startDatetime;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set specialistId
     *
     * @param integer $specialistId
     * @return Appointment
     */
    public function setSpecialistId($specialistId)
    {
        $this->specialistId = $specialistId;

        return $this;
    }

    /**
     * Get specialistId
     *
     * @return integer 
     */
    public function getSpecialistId()
    {
        return $this->specialistId;
    }

    /**
     * Set patientId
     *
     * @param integer $patientId
     * @return Appointment
     */
    public function setPatientId($patientId)
    {
        $this->patientId = $patientId;

        return $this;
    }

    /**
     * Get patientId
     *
     * @return integer 
     */
    public function getPatientId()
    {
        return $this->patientId;
    }

    /**
     * Set startDatetime
     *
     * @param \DateTime $startDatetime
     * @return Appointment
     */
    public function setStartDatetime($startDatetime)
    {
        $this->startDatetime = $startDatetime;

        return $this;
    }

    /**
     * Get startDatetime
     *
     * @return \DateTime 
     */
    public function getStartDatetime()
    {
        return $this->startDatetime;
    }

    /**
     * Set specialist
     *
     * @param \AppBundle\Entity\Specialist $specialist
     * @return Appointment
     */
    public function setSpecialist(\AppBundle\Entity\Specialist $specialist = null)
    {
        $this->specialist = $specialist;

        return $this;
    }

    /**
     * Get specialist
     *
     * @return \AppBundle\Entity\Specialist 
     */
    public function getSpecialist()
    {
        return $this->specialist;
    }

    /**
     * Returns end date time
     *
     * @return \DateTime
     */
    public function getEndDatetime()
    {
        $date = clone $this->startDatetime;
        return $date->add(new \DateInterval('PT30M'));
    }
}
