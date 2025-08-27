import * as feedService from '../services/feed.service.js';

export async function recordFeed(req, res) {
  try {
    const { adopterId, catId, kibblesUsed = 1 } = req.body;

    // Validate required fields
    if (!adopterId || !catId) {
      return res.status(400).json({
        success: false,
        message: 'adopterId and catId are required'
      });
    }

    // Validate kibblesUsed is a positive number
    if (kibblesUsed <= 0) {
      return res.status(400).json({
        success: false,
        message: 'kibblesUsed must be a positive number'
      });
    }

    // Create the feed record
    const feed = await feedService.createFeed(adopterId, catId, kibblesUsed);

    res.status(201).json({
      success: true,
      message: 'Feed recorded successfully',
      data: feed
    });

  } catch (error) {
    console.error('Error recording feed:', error);
    
    if (error.message === 'Adopter not found') {
      return res.status(404).json({
        success: false,
        message: 'Adopter not found'
      });
    }

    if (error.message === 'Cat not found') {
      return res.status(404).json({
        success: false,
        message: 'Cat not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to record feed',
      error: error.message
    });
  }
}

export async function getAdopterFeeds(req, res) {
  try {
    const { adopterId } = req.params;

    if (!adopterId) {
      return res.status(400).json({
        success: false,
        message: 'adopterId is required'
      });
    }

    const feeds = await feedService.getFeedsByAdopter(adopterId);

    res.status(200).json({
      success: true,
      data: feeds
    });

  } catch (error) {
    console.error('Error fetching adopter feeds:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feeds',
      error: error.message
    });
  }
}

export async function getCatFeeds(req, res) {
  try {
    const { catId } = req.params;

    if (!catId) {
      return res.status(400).json({
        success: false,
        message: 'catId is required'
      });
    }

    const feeds = await feedService.getFeedsByCat(catId);

    res.status(200).json({
      success: true,
      data: feeds
    });

  } catch (error) {
    console.error('Error fetching cat feeds:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feeds',
      error: error.message
    });
  }
}

export async function getAdopterFeedStats(req, res) {
  try {
    const { adopterId } = req.params;

    if (!adopterId) {
      return res.status(400).json({
        success: false,
        message: 'adopterId is required'
      });
    }

    const stats = await feedService.getFeedStats(adopterId);

    res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Error fetching adopter feed stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feed stats',
      error: error.message
    });
  }
}
