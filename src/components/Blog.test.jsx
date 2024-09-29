import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect, describe, beforeEach, vi } from "vitest";

import Blog from './Blog'

let container;
const mockHandler = vi.fn()

describe('<Blog />', () => {

    beforeEach(() => {
        const blog = {
            title: "Nuevo blog con react",
            author: "Carlos Pingo",
            likes: 10,
            url: "www.carlos.org",
            user: {
                username: "cpingo"
            }
        }

        container = render(
            <Blog 
                blog={blog}
                onClickLike={mockHandler} /> 
        ).container
    })

    test("at start render Blog with title and author, but no URL or likes by default", async () => {    
        await screen.findByText('Nuevo blog con react - Carlos Pingo')
        const div = container.querySelector('.detail-section')
        expect(div).toHaveStyle('display:none')
    
        expect(screen.queryByText('10')).not.toBeVisible()
        expect(screen.queryByText('www.carlos.org')).not.toBeVisible()
    })

    test("after clicking the view button, url and likes are displayed", async() => {
        await screen.findByText('Nuevo blog con react - Carlos Pingo')
        const buttonView = screen.getByText("view");
        
        const user = userEvent.setup();
        await user.click(buttonView)
        
        expect(screen.queryByText('10')).toBeVisible()
        expect(screen.queryByText('www.carlos.org')).toBeVisible()
    })

    test("clicking the button calls event handler twice", async () => {
        await screen.findByText('Nuevo blog con react - Carlos Pingo')
        const buttonView = screen.getByText("like");

        const user = userEvent.setup();
        await user.dblClick(buttonView)
        
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})