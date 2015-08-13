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

class Esites_Editor_Model_System_Config_Source_Theme_Values extends Varien_Object
{
    protected $themes = array(
        'default',
        '3024-day',
        '3024-night',
        'ambiance',
        'base16-dark',
        'base16-light',
        'blackboard',
        'cobalt',
        'colorforth',
        'eclipse',
        'elegant',
        'erlang-dark',
        'lesser-dark',
        'liquibyte',
        'mbo',
        'mdn-like',
        'midnight',
        'monokai',
        'neat',
        'neo',
        'night',
        'paraiso-dark',
        'paraiso-light',
        'pastel-on-dark',
        'rubyblue',
        'solarized dark',
        'solarized light',
        'the-matrix',
        'tomorrow-night-bright',
        'tomorrow-night-eighties',
        'ttcn',
        'twilight',
        'vibrant-ink',
        'xq-dark',
        'xq-light',
        'zenburn'
    );

    public function toOptionArray()
    {
        $values = array_map(function ($val) {
            return array(
                'value' => $val,
                'label' => $val
            );
        }, $this->themes);

        return $values;
    }
}