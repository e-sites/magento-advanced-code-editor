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
     * All available configuration options and their respective type
     *
     * @var array
     */
    protected $configOptions = array(
        'editor/general/sections' => 'string',
        'editor/general/selectors' => 'string',
        'editor/prefs/emmet' => 'bool',
        'editor/prefs/activeLine' => 'bool',
        'editor/prefs/codeFolding' => 'bool',
        'editor/prefs/lineWrapping' => 'bool',
        'editor/prefs/matchTags' => 'bool',
        'editor/prefs/matchHighlight' => 'bool',
        'editor/prefs/trailingSpaces' => 'bool',
        'editor/prefs/closeTags' => 'bool',
        'editor/prefs/search' => 'bool',
        'editor/prefs/completion' => 'bool',
        'editor/prefs/lint' => 'bool',
        'editor/prefs/keymap' => 'string',
        'editor/appearance/theme' => 'string',
        'editor/appearance/scrollbars' => 'string',
        'editor/appearance/tabIndent' => 'bool',
        'editor/appearance/indentUnit' => 'int',
        'editor/appearance/lineLength' => 'int',
        'editor/appearance/autoFormat' => 'bool',
        'editor/appearance/fontSize' => 'string'
    );

    /**
     * Return config settings for widgets insertion plugin based on editor element config
     *
     * @param Varien_Object $config
     *
     * @return array
     */
    public function getPluginSettings($config=array())
    {
        $i = 0;
        $config = array();
        $store = Mage::app()->getStore();
        $configPlugins = (is_object($config) ? $config->getData('plugins') : array());
        $plugin = array(
            'name' => 'esites_editor',
            'src' => Mage::getBaseUrl('js') . 'tiny_mce/plugins/esites_editor/esites_editor_plugin.js'
        );

        foreach ($this->configOptions as $option => $type) {
            $opt = explode('/', $option);
            $value = Mage::getStoreConfig($option, $store);
            settype($value, $type);
            $config[$opt[2]] = $value;
        }

        if (!empty($config['selectors'])) {
            $config['selectors'] = (array) explode(',', str_replace(array("\r", "\n"), '', $config['selectors']));
        }

        if (!empty($config['sections'])) {
            $config['sections'] = (array) explode(',', $config['sections']);

            foreach($config['sections'] as $key) {
                $arr = array();

                if (strpos($key, '|') !== false) {
                    $arr = explode('|', $key);
                    unset($config['sections'][$i]);
                    $config['sections'] = array_merge(array_values($config['sections']), array_values($arr));
                }

                $i++;
            }
        }

        $plugin['config'] = $config;
        $EsitesEditorPlugin = array($plugin);
        $variableConfig['plugins'] = array_merge($EsitesEditorPlugin, $configPlugins);

        return $variableConfig;
    }
}