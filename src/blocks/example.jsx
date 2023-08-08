wp.blocks.registerBlockType('wpstarter/example', {
    title: 'Example',
    icon: 'smiley',
    category: 'common',
    edit: function() {
        return (
            <p className="example">Hello World!</p>
        );
    }
});
