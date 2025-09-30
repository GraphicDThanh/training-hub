import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './Button.js';

storiesOf('Buttons', module)
  .add('button delete', () => (
    <Button
      text="Delete"
      bg="#fb5a4a"
      onClick={() => {alert('Click btn delete')}}
    />
  ))
  .add('button primary default', () => (
    <Button
      primary
      text="Edit"
      bg="#1c67c3"
      onClick={() => {alert('Click btn edit')}}
    />
  ))
  .add('button primary small', () => (
    <Button
      primary
      text="Edit"
      bg="#1c67c3"
      size="small"
      onClick={() => {alert('Click btn edit')}}
    />
  ))
  .add('button secondary default', () => (
    <Button
      secondary
      text="Save"
      onClick={() => {alert('Click btn save')}}
    />
  ))
  .add('button secondary small', () => (
    <Button
      secondary
      text="Save"
      size="small"
      onClick={() => {alert('Click btn save')}}
    />
  ));
