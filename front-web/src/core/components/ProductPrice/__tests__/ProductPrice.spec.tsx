import React from 'react';
import { render, screen } from '@testing-library/react'
import ProductPrice from '..'

test('shouldRenderProductPrice', () => {

    //Arrange
        const price = 1200;
    //Act
        render(
            <ProductPrice price={price}/>
        )
    //Assert
            screen.debug();

            const currency = screen.getByText('R$');
            const priceElement = screen.getByText('1.200,00');
            
            expect(currency).toBeInTheDocument();
            expect(priceElement).toBeInTheDocument();
});