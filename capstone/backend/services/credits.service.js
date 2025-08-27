import db from '../models/index.js';

export async function createCredits(adopterId, initialKibbles = 0) {
  try {
    const credits = await db.Credit.create({
      adopter_id: adopterId,
      current_kibbles: initialKibbles,
      total_purchased: initialKibbles,
    });
    return credits;
  } catch (error) {
    console.error('Error creating credits:', error);
    throw error;
  }
}

export async function getCreditsByAdopterId(adopterId) {
  try {
    const credits = await db.Credit.findOne({
      where: { adopter_id: adopterId },
      include: [
        {
          model: db.Adopter,
          as: 'adopter',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    return credits;
  } catch (error) {
    console.error('Error fetching credits:', error);
    throw error;
  }
}

export async function addCredits(adopterId, kibblesToAdd) {
  try {
    const credits = await db.Credit.findOne({
      where: { adopter_id: adopterId }
    });
    
    if (!credits) {
      // Create credits record if it doesn't exist
      return await createCredits(adopterId, kibblesToAdd);
    }
    
    const updatedCredits = await credits.update({
      current_kibbles: parseFloat(credits.current_kibbles) + parseFloat(kibblesToAdd),
      total_purchased: parseFloat(credits.total_purchased) + parseFloat(kibblesToAdd),
    });
    
    return updatedCredits;
  } catch (error) {
    console.error('Error adding credits:', error);
    throw error;
  }
}

export async function subtractCredits(adopterId, kibblesToSubtract) {
  try {
    const credits = await db.Credit.findOne({
      where: { adopter_id: adopterId }
    });
    
    if (!credits) {
      throw new Error('No credits record found for this adopter');
    }
    
    const currentKibbles = parseFloat(credits.current_kibbles);
    const kibblesToSubtractNum = parseFloat(kibblesToSubtract);
    
    if (currentKibbles < kibblesToSubtractNum) {
      throw new Error('Insufficient kibbles balance');
    }
    
    const updatedCredits = await credits.update({
      current_kibbles: currentKibbles - kibblesToSubtractNum,
    });
    
    return updatedCredits;
  } catch (error) {
    console.error('Error subtracting credits:', error);
    throw error;
  }
}

export async function getCreditsBalance(adopterId) {
  try {
    const credits = await db.Credit.findOne({
      where: { adopter_id: adopterId },
      attributes: ['current_kibbles', 'total_purchased'],
    });
    
    return credits ? {
      current_kibbles: parseFloat(credits.current_kibbles),
      total_purchased: parseFloat(credits.total_purchased),
    } : { current_kibbles: 0, total_purchased: 0 };
  } catch (error) {
    console.error('Error fetching credits balance:', error);
    throw error;
  }
}
