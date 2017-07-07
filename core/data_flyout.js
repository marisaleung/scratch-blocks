/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2017 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Utility functions for handling variables.
 * @author marisaleung@google.com (Marisa Leung)
 */
'use strict';

/**
 * @name Blockly.DataFlyout
 * @namespace
 **/
goog.provide('Blockly.DataFlyout');

goog.require('Blockly.Blocks');
goog.require('Blockly.VariableModel');
goog.require('Blockly.Variables');
goog.require('Blockly.Workspace');

/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace contianing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.DataFlyout = function(workspace) {
  var variableModelList = workspace.getVariablesOfType('');
  variableModelList.sort(Blockly.VariableModel.compareByName);

  var xmlList = [];
  var button = goog.dom.createDom('button');
  button.setAttribute('text', Blockly.Msg.NEW_VARIABLE);
  button.setAttribute('callbackKey', 'CREATE_VARIABLE');

  workspace.registerButtonCallback('CREATE_VARIABLE', function(button) {
    Blockly.Variables.createVariable(button.getTargetWorkspace());
  });

  xmlList.push(button);

  for (var i = 0; i < variableModelList.length; i++) {
    if (Blockly.Blocks['data_variable']) {
      // <block type="data_variable">
      //    <field name="VARIABLE" variableType="" id="">variablename</field>
      // </block>
      var block = goog.dom.createDom('block');
      block.setAttribute('type', 'data_variable');
      block.setAttribute('gap', 8);
      block.setAttribute('id', 'VAR_' + variableModelList[i].name);

      var field = goog.dom.createDom('field', null, variableModelList[i].name);
      field.setAttribute('name', 'VARIABLE');
      field.setAttribute('variableType', variableModelList[i].type);
      field.setAttribute('id', variableModelList[i].getId());
      block.appendChild(field);

      xmlList.push(block);
    }
  }

  if (xmlList.length > 1) { // The button is always there.
    xmlList[xmlList.length - 1].setAttribute('gap', 24);

    if (Blockly.Blocks['data_setvariableto']) {
      // <block type="data_setvariableto" gap="20">
      //   <field name="VARIABLE" id="" variableType = "">
      //     variablename
      //   </field>
      //   <value name="VALUE">
      //     <shadow type="text">
      //       <field name="TEXT">0</field>
      //     </shadow>
      //   </value>
      // </block>
      var block = goog.dom.createDom('block');
      block.setAttribute('type', 'data_setvariableto');
      block.setAttribute('gap', 8);
      block.appendChild(Blockly.Variables.createVariableDom_(variableModelList[0]));
      block.appendChild(Blockly.Variables.createTextDom_());
      xmlList.push(block);
    }
    if (Blockly.Blocks['data_changevariableby']) {
      // <block type="data_changevariableby">
      //   <field name="VARIABLE" id="" variableType = "">
      //     variablename
      //   </field>
      //   <value name="VALUE">
      //     <shadow type="math_number">
      //       <field name="NUM">0</field>
      //     </shadow>
      //   </value>
      // </block>
      var block = goog.dom.createDom('block');
      block.setAttribute('type', 'data_changevariableby');
      block.setAttribute('gap', 8);
      block.appendChild(Blockly.Variables.createVariableDom_(variableModelList[0]));
      block.appendChild(Blockly.Variables.createMathNumberDom_());
      xmlList.push(block);
    }
    if (Blockly.Blocks['data_showvariable']) {
      // <block type="data_showvariable">
      //   <field name="VARIABLE" id="" variableType = "">
      //     variablename
      //   </field>
      // </block>
      var block = goog.dom.createDom('block');
      block.setAttribute('type', 'data_showvariable');
      block.setAttribute('gap', 8);
      block.appendChild(Blockly.Variables.createVariableDom_(variableModelList[0]));
      xmlList.push(block);
    }
    if (Blockly.Blocks['data_hidevariable']) {
      // <block type="data_showvariable">
      //   <field name="VARIABLE" id="" variableType = "">
      //     variablename
      //   </field>
      // </block>
      var block = goog.dom.createDom('block');
      block.setAttribute('type', 'data_hidevariable');
      block.appendChild(Blockly.Variables.createVariableDom_(variableModelList[0]));
      xmlList.push(block);
    }
  }

  var listButton = goog.dom.createDom('button');
  listButton.setAttribute('text', Blockly.Msg.NEW_LIST);
  listButton.setAttribute('callbackKey', 'CREATE_LIST');
  workspace.registerButtonCallback('CREATE_LIST', function(button) {
    Blockly.Variables.createVariable(button.getTargetWorkspace(), null, 'list');
  });

  xmlList.push(listButton);


  // Now add list variables to the flyout

  variableModelList = workspace.getVariablesOfType('list');
  variableModelList.sort(Blockly.VariableModel.compareByName);
  for (var i = 0; i < variableModelList.length; i++) {
    if (Blockly.Blocks['data_variable']) {
      // <block type="data_variable">
      //    <field name="VARIABLE" variableType="list" id="">variablename</field>
      // </block>
      var block = goog.dom.createDom('block');
      block.setAttribute('type', 'data_variable');
      block.setAttribute('gap', 8);
      block.setAttribute('id', 'VAR_' + variableModelList[i].name);

      var field = goog.dom.createDom('field', null, variableModelList[i].name);
      field.setAttribute('name', 'VARIABLE');
      field.setAttribute('variableType', variableModelList[i].type);
      field.setAttribute('id', variableModelList[i].getId());
      block.appendChild(field);

      xmlList.push(block);
    }
  }

  if (variableModelList.length > 0) { // The button is always there.
    xmlList[xmlList.length - 1].setAttribute('gap', 24);

    if (Blockly.Blocks['data_addtolist']) {
      // <block type="data_addtolist">
      //   <field name="VARIABLE" variableType="list" id="">variablename</field>
      //   <value name="ITEM">
      //     <shadow type="text">
      //       <field name="TEXT">thing</field>
      //     </shadow>
      //   </value>
      // </block>
      var gap = 8;
      var blockText = '<xml>' +
          '<block type="data_addtolist" gap="' + gap + '">' +
          Blockly.Variables.generateVariableFieldXml_(variableModelList[0]) +
          '<value name="ITEM">' +
          '<shadow type="text">' +
          '<field name="TEXT">thing</field>' +
          '</shadow>' +
          '</value>' +
          '</block>' +
          '</xml>';
      var block = Blockly.Xml.textToDom(blockText).firstChild;
      xmlList.push(block);
    }
    if (Blockly.Blocks['data_deleteoflist']) {
      // <block type="data_deleteoflist">
      //   <field name="VARIABLE" variableType="list" id="">variablename</field>
      //   <value name="INDEX">
      //     <shadow type="math_integer">
      //       <field name="NUM">1</field>
      //     </shadow>
      //   </value>
      // </block>
      var gap = 8;
      var blockText = '<xml>' +
          '<block type="data_deleteoflist" gap="' + gap + '">' +
          Blockly.Variables.generateVariableFieldXml_(variableModelList[0]) +
          '<value name="INDEX">' +
          '<shadow type="math_integer">' +
          '<field name="NUM">1</field>' +
          '</shadow>' +
          '</value>' +
          '</block>' +
          '</xml>';
      var block = Blockly.Xml.textToDom(blockText).firstChild;
      xmlList.push(block);
    }
    if (Blockly.Blocks['data_insertatlist']) {
      // <block type="data_insertatlist">
      //   <field name="VARIABLE" variableType="list" id="">variablename</field>
      //   <value name="INDEX">
      //     <shadow type="math_integer">
      //       <field name="NUM">1</field>
      //     </shadow>
      //   </value>
      //   <value name="ITEM">
      //     <shadow type="text">
      //       <field name="TEXT">thing</field>
      //     </shadow>
      //   </value>
      // </block>
      var gap = 8;
      var blockText = '<xml>' +
          '<block type="data_insertatlist" gap="' + gap + '">' +
          Blockly.Variables.generateVariableFieldXml_(variableModelList[0]) +
          '<value name="INDEX">' +
          '<shadow type="math_integer">' +
          '<field name="NUM">1</field>' +
          '</shadow>' +
          '</value>' +
          '<value name="ITEM">' +
          '<shadow type="text">' +
          '<field name="TEXT">thing</field>' +
          '</shadow>' +
          '</value>' +
          '</block>' +
          '</xml>';
      var block = Blockly.Xml.textToDom(blockText).firstChild;
      xmlList.push(block);
    }
    if (Blockly.Blocks['data_replaceitemoflist']) {
      // <block type="data_replaceitemoflist">
      //   <field name="VARIABLE" variableType="list" id="">variablename</field>
      //   <value name="INDEX">
      //     <shadow type="math_integer">
      //       <field name="NUM">1</field>
      //     </shadow>
      //   </value>
      //   <value name="ITEM">
      //     <shadow type="text">
      //       <field name="TEXT">thing</field>
      //     </shadow>
      //   </value>
      // </block>
      var gap = 8;
      var blockText = '<xml>' +
          '<block type="data_replaceitemoflist" gap="' + gap + '">' +
          Blockly.Variables.generateVariableFieldXml_(variableModelList[0]) +
          '<value name="INDEX">' +
          '<shadow type="math_integer">' +
          '<field name="NUM">1</field>' +
          '</shadow>' +
          '</value>' +
          '<value name="ITEM">' +
          '<shadow type="text">' +
          '<field name="TEXT">thing</field>' +
          '</shadow>' +
          '</value>' +
          '</block>' +
          '</xml>';
      var block = Blockly.Xml.textToDom(blockText).firstChild;
      xmlList.push(block);
    }
    if (Blockly.Blocks['data_itemoflist']) {
      // <block type="data_itemoflist">
      //   <field name="VARIABLE" variableType="list" id="">variablename</field>
      //   <value name="INDEX">
      //     <shadow type="math_integer">
      //       <field name="NUM">1</field>
      //     </shadow>
      //   </value>
      // </block>
      var gap = 8;
      var blockText = '<xml>' +
          '<block type="data_itemoflist" gap="' + gap + '">' +
          Blockly.Variables.generateVariableFieldXml_(variableModelList[0]) +
          '<value name="INDEX">' +
          '<shadow type="math_integer">' +
          '<field name="NUM">1</field>' +
          '</shadow>' +
          '</value>' +
          '</block>' +
          '</xml>';
      var block = Blockly.Xml.textToDom(blockText).firstChild;
      xmlList.push(block);
    }
    if (Blockly.Blocks['data_lengthoflist']) {
      // <block type="data_lengthoflist">
      //   <field name="VARIABLE" variableType="list" id="">variablename</field>
      // </block>
      var gap = 8;
      var blockText = '<xml>' +
          '<block type="data_lengthoflist" gap="' + gap + '">' +
          Blockly.Variables.generateVariableFieldXml_(variableModelList[0]) +
          '</block>' +
          '</xml>';
      var block = Blockly.Xml.textToDom(blockText).firstChild;
      xmlList.push(block);
    }
    if (Blockly.Blocks['data_listcontainsitem']) {
      // <block type="data_listcontainsitem">
      //   <field name="VARIABLE" variableType="list" id="">variablename</field>
      //   <value name="ITEM">
      //     <shadow type="text">
      //       <field name="TEXT">thing</field>
      //     </shadow>
      //   </value>
      // </block>
      var gap = 8;
      var blockText = '<xml>' +
          '<block type="data_listcontainsitem" gap="' + gap + '">' +
          Blockly.Variables.generateVariableFieldXml_(variableModelList[0]) +
          '<value name="ITEM">' +
          '<shadow type="text">' +
          '<field name="TEXT">thing</field>' +
          '</shadow>' +
          '</value>' +
          '</block>' +
          '</xml>';
      var block = Blockly.Xml.textToDom(blockText).firstChild;
      xmlList.push(block);
    }
    if (Blockly.Blocks['data_showlist']) {
      // <block type="data_showlist">
      //   <field name="VARIABLE" variableType="list" id="">variablename</field>
      // </block>
      var gap = 8;
      var blockText = '<xml>' +
          '<block type="data_showlist" gap="' + gap + '">' +
          Blockly.Variables.generateVariableFieldXml_(variableModelList[0]) +
          '</block>' +
          '</xml>';
      var block = Blockly.Xml.textToDom(blockText).firstChild;
      xmlList.push(block);
    }
    if (Blockly.Blocks['data_hidelist']) {
      // <block type="data_hidelist">
      //   <field name="VARIABLE" variableType="list" id="">variablename</field>
      // </block>
      var gap = 8;
      var blockText = '<xml>' +
          '<block type="data_hidelist" gap="' + gap + '">' +
          Blockly.Variables.generateVariableFieldXml_(variableModelList[0]) +
          '</block>' +
          '</xml>';
      var block = Blockly.Xml.textToDom(blockText).firstChild;
      xmlList.push(block);
    }
  }

  return xmlList;
};
