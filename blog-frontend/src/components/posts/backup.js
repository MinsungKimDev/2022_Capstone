<PostItemBlock>
        <Link to="/write">
                {showWriteButton&&(<Fab
                    color="secondary"
                    sx={{
                        position: 'fixed',
                        bottom: (theme) => theme.spacing(10),
                        right: (theme) => theme.spacing(4),
                    }}
                >
                    <AddIcon />
                </Fab>)}
        </Link>
            {!loading && posts && (
            <>
                {posts.map(post =>(
                <PostItem post={post.post} key={post.post.id} listbody={post.body} />
                ))}
            </> 
            )}
</PostItemBlock>