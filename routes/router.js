/* 
** Opareta - APY API Router
** This router includes the following; 
> Calculate APYs 
> Generate and display a customer's APY Calculation History.
> Delete a Customer's APY History. 
*
*/

module.exports = {

    addAPY:(req, res) =>{

    const { deposit, customer_id, interest_rate, yearly_compound_times } = req.body; // Capture post request data from user request

    // All values are required
    if (deposit === '' || customer_id === '' || interest_rate === '' || yearly_compound_times === '') {

        // If any values missing, request for it
        res.status(400).send('Bad Request - some values are missing.');

    } else {

        const date = new Date(); // Date of signup
        const deleted=0; // Deleted default is 0 - means not deleted, 1 means it's deleted
        //let calculateApy = Math.pow((1 + (Number(interest_rate) / Number(yearly_compound_times))),(Number(yearly_compound_times) - 1));
        let calculateApy = Math.pow((1 + (interest_rate/yearly_compound_times)),(yearly_compound_times - 1));
        console.log(calculateApy);

        // send the user's details to the database
        db.run('INSERT INTO apy (deposit, customer_id, interest_rate, yearly_compound_times, date, apy_value, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [deposit, customer_id, interest_rate, yearly_compound_times, date, calculateApy, deleted], (err, result) => {

                // Identify any errors encountered during db transaction
                if (err) {
                    return res.status(500).send(err);
                } else {
                res.status(200).send('APY calculated and saved successfully.');
                }
            });
    }
    },

    apy: (req, res) =>{

    // Capture parameter value from request
    const customer_id = req.params.id; // customer ID
    const deleted=0; // Deleted default is 0 - means not deleted, 1 means it's deleted

    // All values must are required
    if (customer_id === '') {

        // If any values missing, request for it
        res.status(400).send('Bad Request - some values are missing.');

    } else {

    // Find customer calculations from apy database table
    db.all('SELECT * FROM apy WHERE customer_id = ? and deleted=?  ORDER BY date desc', [customer_id, deleted], (err, rows) => {

        // In case error encountered during transaction, display error
        if (err) {
            res.status(500).send('Problem fetching database results.');

        } else {
                        
        // Check if apy data history exists for customer
        if (rows.length>0) {
            
            // If yes, display the data
            res.json(rows);

        } else {    
            
            // If no APY data, display message
            res.status(200).send(`No APY calculation History for this customer.`);
        }
           
        } 
    });
    }
    },

    deleteAPY:(req, res)=>{

    // Capture parameter value from request
    const customer_id = req.params.id; // customer ID
    const deleted=1; // Deleted default is 0 - means not deleted, 1 means it's deleted

    // All values must are required
    if (customer_id === '') {

        // If any values missing, request for it
        res.status(400).send('Bad Request - some values are missing.');

    } else {

    // Check if customer history exists
    db.all('SELECT * FROM apy WHERE customer_id = ?', [customer_id], (err, rows) => {

        // If error encountered during database transaction, abandon transaction
        if (err) {
            return res.status(500).send(err);
        }

        // If History doesn't exist, display message
        if (rows.length < 1) {
            res.status(200).send(`No APY calculation History to delete for this customer.`);
        } else {
            
            // Update APY database table
            db.run('UPDATE apy SET deleted=? WHERE customer_id = ?', [deleted, customer_id], (err, result) => {
            
            // Identify any errors encountered during database transaction
            if (err) {
                res.status(500).send('Problem deleting APY data.');
            } else{
                res.status(200).send('Customer APY History deleted successfully.')
            }
        });
      }
    });
    }
   }
}

