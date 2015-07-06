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
 * Widgets Plugin Config for Esites_Editor
 *
 * @category    Esites
 * @package     Esites_Editor
 */
class Esites_Editor_Model_Config extends Varien_Object
{
    /**
     * Return config settings for widgets insertion plugin based on editor element config
     *
     * @param Varien_Object $config
     *
     * @return array
     */
    public function getPluginSettings($config)
    {
        $store = Mage::app()->getStore();
        $configPlugins = $config->getData('plugins');
        $EsitesEditorPlugin = array(
            array(
                'name' => 'esites_editor',
                'src' => Mage::getBaseUrl('js') . 'tiny_mce/plugins/esites_editor/esites_editor_plugin.js',
                'config' => array(
                    'theme' => (string) Mage::getStoreConfig('editor/appearance/theme', $store),
                    'emmet' => (bool) Mage::getStoreConfig('editor/prefs/emmet', $store),
                    'activeLine' => (bool) Mage::getStoreConfig('editor/prefs/activeLine', $store),
                    'codeFolding' => (bool) Mage::getStoreConfig('editor/prefs/codeFolding', $store),
                    'indentUnit' => (int) Mage::getStoreConfig('editor/prefs/indentUnit', $store),
                    'lineWrapping' => (bool) Mage::getStoreConfig('editor/prefs/lineWrapping', $store),
                    'autoFormat' => (bool) Mage::getStoreConfig('editor/appearance/autoFormat', $store),
                    'matchTags' => (bool) Mage::getStoreConfig('editor/prefs/matchTags', $store),
                    'matchHighlight' => (bool) Mage::getStoreConfig('editor/prefs/matchHighlight', $store),
                    'closeTags' => (bool) Mage::getStoreConfig('editor/prefs/closeTags', $store),
                    'search' => (bool) Mage::getStoreConfig('editor/prefs/search', $store),
                    'fontSize' => (string) Mage::getStoreConfig('editor/appearance/fontSize', $store),
                    'keymap' => (string) Mage::getStoreConfig('editor/prefs/keymap', $store)
                )
            )
        );

        $variableConfig['plugins'] = array_merge($EsitesEditorPlugin, $configPlugins);

        return $variableConfig;
    }
}