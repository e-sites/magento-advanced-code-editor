<?php
/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * @category    Esites
 * @package     Esites_Editor
 * @copyright   Copyright (c) 2015 E-sites (http://www.e-sites.nl)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * Esites Cms Observer
 *
 * @category   Esites
 * @package    Esites_Editor
 */

class Esites_Editor_Model_Observer
{
    /**
     * Add additional settings to wysiwyg config (Emmet)
     *
     * @param Varien_Event_Observer $observer
     *
     * @return Mage_Widget_Model_Observer
     */
    public function prepareWidgetsPluginConfig(Varien_Event_Observer $observer)
    {
        $config = $observer->getEvent()->getConfig();

        if ($config->getData('add_widgets') && Mage::getStoreConfig('editor/general/enabled', Mage::app()->getStore())) {
            $settings = Mage::getModel('editor/config')->getPluginSettings($config);
            $config->addData($settings);
        }

        return $this;
    }
}