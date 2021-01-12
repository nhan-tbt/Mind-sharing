var pInteractionController = {};
var models = require('../models/');
var Interaction = models.pInteraction;


pInteractionController.removeInteraction = function(PostId, UserId) {
    Interaction.destroy({
        where: {PostId: PostId, 
                UserId: UserId}
    })
}

pInteractionController.createInteraction = function(post_id, user_id) {
    Interaction.create({
        PostId: post_id,
        UserId: user_id
    });
}

module.exports = pInteractionController;