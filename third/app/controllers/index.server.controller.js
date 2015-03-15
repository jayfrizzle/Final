exports.render = function(req, res) {
    res.render('index', {
	title: 'The Feed',
	user:req.user ? req.user.username : ''
    });
};
