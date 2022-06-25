# Pasja Froala Responsive Layout

Pasja is helping us to you for create responsive layouts in Froala Editor.

- Use Bootstrap Grid system
- Supports Vue 3

# Table of Contents

- [**_Requirements_**](#requirements)
- [**_Installation_**](#installation)
- [**_Usage_**](#usage)
  - [**\_Implementation**](#implementation)
  - [**\_Froala Registration**](#froala-registration)
  - [**\_Bootstrap**](#bootstrap)
- [**_Authors && Contributors_**](#authors-&&-Contributors)
- [**_License_**](#license)

# Requirements

- [Vue.js](https://vuejs.org/)
- [FroalaEditor](https://froala.com/wysiwyg-editor/)
- [Bootstrap Grid](https://getbootstrap.com/docs/4.0/layout/grid/)

# Installation

## npm

```bash

$ npm i pasja-froala-responsive-layout


```

## yarn

```bash

$ yarn add pasja-froala-responsive-layout

```

## Usage

### Implementation

How to use Pasja Froala Responsive Layout

Added PasjaFroalaResponsiveLayout to VueApp instance.

```javascript
import PasjaFroalaResponsiveLayout from 'pasja-froala-responsive-layout'
import 'pasja-froala-responsive-layout/dist/style.css'

app.use(PasjaFroalaResponsiveLayout)
```

Use global components in your project app.vue file

```html
<template>
  <PasjaFroalaGrid />
  <PasjaFroalaAlign />
</template>
```

### Froala Registration

Froala registration,

```javascript
// froala.plugin.js

import FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min.js'

import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'

const froalaConfig = {
  toolbarButtons: ['pasjaFroalaLayout'], // add pasjaFroalaLayout in froala editor toolbar
  events: {
    // for find added column and align columns
    click: function (e: any) {
      const clickedElement = e.target
      const isHasColumnClass = clickedElement.className.indexOf('col') !== -1

      if (isHasColumnClass) {
        const froalaLayoutEvent = new CustomEvent('pasja-froala-align', { detail: { element: clickedElement } })
        document.dispatchEvent(froalaLayoutEvent)
      } else {
        const froalaLayoutEvent = new CustomEvent('pasja-froala-align', { detail: { element: null } })
        document.dispatchEvent(froalaLayoutEvent)
      }
    }
  }
}

// Froala register pasjaResponsiveGrid
FroalaEditor.RegisterCommand('pasjaFroalaLayout', {
  title: 'Pasja Responsive Grid',
  icon: '-P-', // if you want added custom icon
  refreshAfterCallback: true,
  callback() {
    this.selection.save() // save caret position

    //
    const froalaLayoutEvent = new CustomEvent('pasja-froala-grid', { detail: { froalaInstance: this } })
    document.dispatchEvent(froalaLayoutEvent)

    this.froalaLayoutPluginActive = true
  },
  refresh() {
    if (this.froalaLayoutPluginActive) {
      const froalaLayoutEvent = new CustomEvent('pasja-froala-grid', { detail: { froalaInstance: null } })
      document.dispatchEvent(froalaLayoutEvent)
    }
  }
})

export FroalaEditor
```

## Bootstrap

Add Bootstrap Grid system in style file

```scss
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap-grid.min.css');
```

## Demo

- [See the full demo codes](https://github.com/berkaycoban/pasja-froala-responsive-layout/blob/main/src/components/Demo.vue)

# Authors && Contributors

- [berkaycoban](https://github.com/berkaycoban)

# License

[The MIT License](http://opensource.org/licenses/MIT)
