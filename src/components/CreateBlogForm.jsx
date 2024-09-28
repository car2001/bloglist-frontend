import { useState } from "react"

const CreateBlogForm = ({handleCreateBlog}) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleChangeTitle = (event) => setTitle(event.target.value)
    const handleChangeAuthor = (event) => setAuthor(event.target.value)
    const handleChangeUrl = (event) => setUrl(event.target.value)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newNote = {
            title, 
            author, 
            url
        }
        await handleCreateBlog(newNote)
        setTitle('');
        setUrl('');
        setAuthor('');
    }

    return( 
        <div>
            <h2>Create new note</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    title:
                    <input 
                        type="text" 
                        value={title}
                        onChange={handleChangeTitle} />
                </div>
                <div>
                    author:
                    <input 
                        type="text" 
                        value={author}
                        onChange={handleChangeAuthor} />
                </div>
                <div>
                    url:
                    <input 
                        type="text" 
                        value={url}
                        onChange={handleChangeUrl} />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default CreateBlogForm;