import React from 'react';
import { screen, render } from '@testing-library/react';
import AppRoute from '../Route';

describe('Route', ()=> {

  it('Render Route Page', ()=> {
    render(<AppRoute/>);

    expect(screen.getByText('Participation: 95.57%')).toBeInTheDocument();
  })

})