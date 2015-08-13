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

class Esites_Editor_Model_System_Config_Source_Keymap_Values extends Varien_Object
{
    protected $keymaps = array(
        'default' => 'Default',
        'emacs' => 'Emacs',
        'vim' => 'Vim',
        'sublime' => 'Sublime Text'
    );

    public function toOptionArray()
    {
        $values = array();

        foreach ($this->keymaps as $key => $label) {
            $values[] = array(
                'value' => $key,
                'label' => $label
            );
        }

        return $values;
    }
}