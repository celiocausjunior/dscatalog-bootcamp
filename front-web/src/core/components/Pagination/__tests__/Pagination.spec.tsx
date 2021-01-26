import React from 'react';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from '..'

test('shouldRenderPagination', () => {
    const totalPages = 3;
    const activePage = 0;
    const onChange = () => null;


    render(
        <Pagination
            totalPages={totalPages}
            activePage={activePage}
            onChange={onChange}
        />
    );

    const previousElement = screen.getByTestId("arrow-icon-previous");
    const nextElement = screen.getByTestId("arrow-icon-next");
    const firstPageItem = screen.getByText('1');
    const secondPageItem = screen.getByText('2');
    const thirdPageItem = screen.getByText('3');

    expect(previousElement).toBeInTheDocument();
    expect(previousElement).toHaveClass('page-inactive');
    expect(nextElement).toBeInTheDocument();
    expect(nextElement).toHaveClass('page-active');
    expect(firstPageItem).toBeInTheDocument();
    expect(firstPageItem).toHaveClass('active');
    expect(secondPageItem).toBeInTheDocument();
    expect(secondPageItem).not.toHaveClass('active');
    expect(thirdPageItem).toBeInTheDocument();
    expect(thirdPageItem).not.toHaveClass('active');


});

test('shouldEnablePreviousArrowIconAndDisableNextArrow', () => {
    const totalPages = 3;
    const activePage = 2;
    const onChange = () => null;

    render(
        <Pagination
            totalPages={totalPages}
            activePage={activePage}
            onChange={onChange}
        />
    );

    const previousElement = screen.getByTestId("arrow-icon-previous");
    const nextElement = screen.getByTestId("arrow-icon-next");
    const firstPageItem = screen.getByText('1');
    const secondPageItem = screen.getByText('2');
    const thirdPageItem = screen.getByText('3');


    expect(previousElement).toBeInTheDocument();
    expect(previousElement).toHaveClass('page-active');
    expect(nextElement).toBeInTheDocument();
    expect(nextElement).toHaveClass('page-inactive');
    expect(firstPageItem).toBeInTheDocument();
    expect(firstPageItem).not.toHaveClass('active');
    expect(secondPageItem).toBeInTheDocument();
    expect(secondPageItem).not.toHaveClass('active');
    expect(thirdPageItem).toBeInTheDocument();
    expect(thirdPageItem).toHaveClass('active');
});

test('ShouldTriggerOnChangeActio', () => {
    const totalPages = 3;
    const activePage = 1;
    const onChange = jest.fn();

    render(
        <Pagination
            totalPages={totalPages}
            activePage={activePage}
            onChange={onChange}
        />
    );

    const previousElement = screen.getByTestId("arrow-icon-previous");
    const nextElement = screen.getByTestId("arrow-icon-next");
    const firstPageItem = screen.getByText('1');
    const secondPageItem = screen.getByText('2');


    userEvent.click(firstPageItem);
    expect(onChange).toHaveBeenCalledWith(0);

    userEvent.click(secondPageItem);
    expect(onChange).toHaveBeenCalledWith(1);
    
    userEvent.click(nextElement);
    expect(onChange).toHaveBeenCalledWith(activePage);
    
    userEvent.click(previousElement);
    expect(onChange).toHaveBeenCalledWith(activePage);
    
    
});