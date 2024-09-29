import { test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import CreateBlogForm from "./CreateBlogForm";


test("<CreateBlogForm /> ", async () => {
    const createBlog = vi.fn();
    const user = userEvent.setup();

    render(
        <CreateBlogForm handleCreateBlog={createBlog} />
    )

    const inputTitle = screen.getByPlaceholderText('write blog title here')
    const inputAuthor = screen.getByPlaceholderText('write blog author here')
    const inputUrl = screen.getByPlaceholderText('write blog url here')
    const createButton = screen.getByText('create')

    await user.type(inputTitle, 'Title Prueba')
    await user.type(inputAuthor, 'Author Prueba')
    await user.type(inputUrl, 'URI Prueba')

    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe("Title Prueba")
    expect(createBlog.mock.calls[0][0].author).toBe("Author Prueba")
    expect(createBlog.mock.calls[0][0].url).toBe("URI Prueba")
})