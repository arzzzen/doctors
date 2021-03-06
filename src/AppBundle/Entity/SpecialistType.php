<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Exclude;

/**
 * SpecialistType
 *
 * @ORM\Table()
 * @ORM\Entity
 * @ExclusionPolicy("None")
 */
class SpecialistType
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
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=50)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="desc", type="text", length=2000, nullable=true)
     */
    private $desc;

    /**
     * @ORM\OneToMany(targetEntity="Specialist", mappedBy="type")
     * @Exclude
     **/
    private $specialists;


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
     * Set title
     *
     * @param string $title
     * @return SpecialistType
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set desc
     *
     * @param string $desc
     * @return SpecialistType
     */
    public function setDesc($desc)
    {
        $this->desc = $desc;

        return $this;
    }

    /**
     * Get desc
     *
     * @return string
     */
    public function getDesc()
    {
        return $this->desc;
    }

    public function __construct() {
        $this->specialists = new ArrayCollection();
    }

    public function getSpecialists() {
        return $this->specialists;
    }

    public function __toString() {
        return $this->title;
    }
}
