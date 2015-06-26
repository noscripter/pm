import React from 'react';
import resource from '../utils/resources.js';

var maco = require('maco');
registerDataTemplates();

module.exports = maco.template(windowTitle);

var ContentControl = maco(contentControl);

function windowTitle(props) {
  // TODO: Close/drag?
  var viewModel = props.viewModel;
  return <ContentControl viewModel={viewModel} key={viewModel.id} />;
}


function contentControl(x) {
  x.render = function() {
    var viewModel = x.props.viewModel;
    var Template;

    if (viewModel) {
      Template = contentTemplateSelector(viewModel);
    }
    if (!Template) {
      return <div>{viewModel}</div>;
    }

    return <Template {...viewModel} />;
  }
}

function contentTemplateSelector(type) {
  var typeName = type && type.constructor && type.constructor.name;
  if (typeName) {
    return resource(typeName);
  }
}

function registerDataTemplates() {
  resource.add('DegreeWindowViewModel', maco.template(ctx => {
    return (
      <h4 className='window-title'>
        <span className='node-name'>{ctx.nodeName}</span>
        <span> has </span>
        <strong> {ctx.dependenciesNumber} </strong>
        <span className={ctx.connectionClassName}>
          {ctx.dependenciesKindName}
        </span>
      </h4>
    );
  }));

  resource.add('SearchResultWindowViewModel', maco.template(ctx => {
      return (
        <h4 className='window-title'>
          Found <strong>{ctx.matchesCountString}</strong> matches
        </h4>
      );
  }));
}