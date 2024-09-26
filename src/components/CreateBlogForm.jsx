const CreateBlogForm = (props) => {

    const handleChangeTitle = (event) => props.setTitle(event.target.value)
    const handleChangeAuthor = (event) => props.setAuthor(event.target.value)
    const handleChangeUrl = (event) => props.setUrl(event.target.value)

    return( 
        <form onSubmit={props.handleCreateBlog}>
            <div>
                title:
                <input 
                    type="text" 
                    value={props.title}
                    onChange={handleChangeTitle} />
            </div>
            <div>
                author:
                <input 
                    type="text" 
                    value={props.author}
                    onChange={handleChangeAuthor} />
            </div>
            <div>
                url:
                <input 
                    type="text" 
                    value={props.url}
                    onChange={handleChangeUrl} />
            </div>
            <button  type='submit' >create</button>
        </form>
    )
}

export default CreateBlogForm;