beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{       

        // Add test steps for filling in only mandatory fields
        //Part 1
        //First provide same first and validation password, and no password error should be visible
        //Then change validation password to a different password than first password, and perform following checks
        // -Password Error message is displayed
        // -Submit button is disabled
        // -Success Message is not visible
        // -Password Error Message is visible
        // -Password Error Message is visible and contains following test "Passwords do not match!"
        
        cy.get('#username').type('Dimplesha')
        cy.get('#email').type('dimple.sha@gmail.com')
        cy.get('input[data-cy="name"]').type('Dimple')
        cy.get('#lastName').type('Sharma')
        cy.get('input[data-testid="phoneNumberTestId"]').type('8349894930')
        cy.get('#password').type('efgh2222')
        cy.get('#confirm').type('efgh2222') //Same first and validation password

         // Assert that success message is visible
         cy.get('#password_error_message').should('not.be.visible')
        //Type confirmation password which is different from first password
        cy.get('#confirm').type('456def') //Different first and validation password
        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')
        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')
        // Assert that error message is visible
        cy.get('#password_error_message').should('have.css', 'display', 'none')
         // Assert that correct error message is visible and contain given text
         cy.get('#password_error_message').should('have.css', 'display', 'none').should('contain', 'Passwords do not match!')

        //Change the test, so the passwords would match
        //Part 2
        //Update validation password as same as First password, and no password error should be visible
        //After making validation and first password as same, click outside on Password section label to update the status of Submit button
        
        cy.get('#confirm').clear() //First clear the validation password text, else script will start concatinating the new password as provided in below step
        cy.get('#confirm').type('efgh2222')
        // Add assertion, that error message is not visible anymore
        //cy.get('#password_error_message').should(not.be.visible)
        cy.get('#password_error_message').should('have.css', 'display', 'none')
        // Add assertion, that submit button is now enabled
        cy.get('h2').contains('Password').click() //Click outside on the Password label to update the state of Submit button
        cy.get('.submit_button').should('be.enabled')
    })
    
    it('User can submit form with all fields added', ()=>{
        //User should submit all mandatory data
        cy.get('#username').type('Dimplesha')
        cy.get('#email').type('dimple.sha@gmail.com')
        cy.get('input[data-cy="name"]').type('Dimple')
        cy.get('#lastName').type('Sharma')
        cy.get('input[data-testid="phoneNumberTestId"]').type('8349894930')

        //Select your favourite Web Language, by clicking on corresponding radio button
        cy.get('#htmlFavLanguage').click()

        //Select your favourite transport, by selecting corresponsing checkboxes
        cy.get('#vehicle1').click()
        cy.get('#vehicle2').click()

        //Select a car from Choose a car dropdown
        cy.get('#cars').select('Audi').should('have.value', 'audi')

        //Select your favourite animal from the dropdown
        cy.get('#animal').select('Cat').should('have.value', 'cat')

        cy.get('#password').type('efgh2222')
        cy.get('#confirm').type('efgh2222')
        // Add test steps for filling in ALL fields
        // Assert that submit button is enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        // Assert that after submitting the form system show successful message
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')   
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        
        // Add test steps for filling in ONLY mandatory fields
        //Part 1
        //Add all mandatory fields
        cy.get('#username').type('Dimplesha')
        cy.get('#email').type('dimple.sha@gmail.com')
        cy.get('input[data-cy="name"]').type('Dimple')
        cy.get('#lastName').type('Sharma')
        cy.get('input[data-testid="phoneNumberTestId"]').type('8349894930')
        cy.get('h2').contains('Password').click()

        //Part 2 - Clear Firstname mandatory field
        cy.get('input[data-cy="name"]').clear()
        cy.get('h2').contains('Password').click()

        //As one of the mandatory field is not added, Submit button should not be visible
        //Hence, Assert that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // example, how to use function, which fills in all mandatory data
        // in order to see the content of the function, scroll to the end of the file
        //Called the function inputValidData that sends f_dimplesha as a username
        inputValidData('f_dimplesha')
    })

    // Add at least 1 test for checking some mandatory field's absence
    it('User cannot submit form in absemce of a mandatory field', ()=>{
    // Add test steps for filling in ONLY mandatory fields
    cy.get('#username').type('Dimplesha')
    cy.get('#email').type('dimple.sha@gmail.com')
    cy.get('input[data-cy="name"]').type('Dimple')
    cy.get('#lastName').type('Sharma')
    cy.get('input[data-testid="phoneNumberTestId"]').type('8349894930')
    cy.get('h2').contains('Password').click()

    //Clear Firstname mandatory field
    cy.get('input[data-cy="name"]').clear()
    cy.get('h2').contains('Password').click()

    //Assert if mandatory field error message is displayed on the screen
    cy.get('#input_error_message').should('be.visible')

    //As Submit button is not enabled, user cannot submit the form even if 1 mandatory field is missing
    //Asset Submit button is not enabled
    cy.get('.submit_button').should('be.disabled')
})
})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        //checking the logo height
            // get element and check its parameter height
            // it should be less than 178 and greater than 100
            cy.get('img').invoke('height').should('be.lessThan', 178)
                .and('be.greaterThan', 100)

        //Check that the width of logo is correct
        cy.get('img').invoke('width').should('be.lessThan', 180)
            .and('be.greaterThan', 150)   
    })

    it('My test for second picture', () => {
        // Create similar test for checking the second picture
            cy.log('Will check logo source and size')
            //Validate if logo is correct
            cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
            //Validate if height of the logo is correct
            cy.get('img[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 150).and('be.greaterThan', 80)
            //Validate if width of the logo is correct
            cy.get('img[data-cy="cypress_logo"]').invoke('width').should('be.lessThan', 150).and('be.greaterThan', 110)      
        })
    });

    it('Check navigation part 1', () => {
            cy.get("nav").children().should("have.length", 2);
            // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
            cy.get("nav").siblings("h1").should("have.text", "Registration form number 2");
            // Get navigation element, find its first child, check the link content and click it
            cy.get("nav").children().eq(0).should("be.visible").and("have.attr", "href", "registration_form_1.html").click();
            // Check that currently opened URL is correct
            cy.url().should("contain", "/registration_form_1.html");
            // Go back to previous page
            cy.go("back");
            cy.log("Back again in registration form 2");
          })


    // Create similar test for checking the second link 
    it('Navigation part 2', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })


    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying check boxes
    it('Check that checkboxes are correct', () => {
        // Checking that array has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)
        // Verify the Checkbox labels
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')
        // verify default state of checkboxes
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
        // Verify that multiple checkboxes can be checked at the same time
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    })

    it('Car dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    // Create test similar to previous one
    
    it('Animal dropdown is correct', () => {
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)
        // Verify that all values in the dropdown
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')


})

function inputValidData(username) {
    cy.log('Username will be filled')
  
    //As this step is in continuation of previous steps where we have username already filled
    //If we enter new username, it concatenates with already added username
    //It's better to clear the field first

    cy.get('#username').clear()
    cy.get('#username').type(username)

    //As this step is in continuation of previous steps where we have username already filled
    //If we enter new email id, it concatenates with already added email id
    //It's better to clear the field first
    cy.get('#email').clear()
    cy.get('#email').type('f_dimple.sha@gmail.com')

    //As this step is in continuation of previous steps where we have username already filled
    //If we enter new first name, it concatenates with already added firstname
    //It's better to clear the field first
    cy.get('[data-cy="name"]').clear()
    cy.get('[data-cy="name"]').type('fDimple')

    cy.get('#lastName').clear()
    cy.get('#lastName').type('fSharma')

    cy.get('[data-testid="phoneNumberTestId"]').clear()
    cy.get('[data-testid="phoneNumberTestId"]').type('1234567890')

    cy.get('#password').clear()
    cy.get('#password').type('fPass')

    cy.get('#confirm').clear()
    cy.get('#confirm').type('fPass')
    
    cy.get('h2').contains('Password').click()

    //Assert that Submit button is enabled
    cy.get('.submit_button').should('be.enabled')
}