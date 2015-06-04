<?php

class Esites_Editor_Model_Source_Status extends Varien_Object
{
    const STATUS_QUEUED		= -1;
    const STATUS_RUNNING	= 1;
    const STATUS_DISABLED	= 2;
    const STATUS_ENDED  	= 3;

    static public function getOptionArray()
    {
        return array(
            self::STATUS_RUNNING    => Mage::helper('catalog')->__('Enabled'),
            self::STATUS_DISABLED   => Mage::helper('catalog')->__('Disabled')
        );
    }
}