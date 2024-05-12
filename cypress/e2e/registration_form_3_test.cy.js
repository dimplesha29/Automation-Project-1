beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list: This is a test suite of Dimple Sharma*/
describe('Visual tests for registration form 3', () => {
    /*  Test suite of Dimple Sharma:
    1. Verify that radio buttons list is available
    2. Verify that country dropdown is available 
    3. Verify that city dropdown is available
    4. Verify that checkboxes are correct
    5. Verify that email format is correct:-email@example.com
    6. Verify that logo source & size is correct.
    */
    //Verify that radio buttons list is available
    it('Check that radio buttons list is correct', () => {
        // Verify if list has 4 elements
        cy.get('input[type="radio"]').should('have.length', 4)
        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')
        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        // Verify that selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    
   it('Check that country dropdown is correct', () => {
        // Verify that dropdown has 4 elements
        cy.get('#country').children().should('have.length', 4)
        // Verify the content of the country dropdown
        cy.get('#country').find('option').then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['', 'Spain', 'Estonia', 'Austria'])
        })
    })
    
    it('Check that city dropdown is correct', () => {
        // Verify that city dropdown is not active before country is chosen
        cy.get('#city').should('not.be.enabled')
        cy.get('#country').select(2)
        cy.get('#city').should('be.enabled')
        // Verify that cities change when country is changed
        cy.get('#country').select(0).should('contain', '')
        cy.get('#city').should('not.be.enabled')
        cy.get('#country').select(1).should('contain', 'Spain')
        cy.get('#city').should('be.enabled').should('contain', 'Malaga')
        cy.get('#country').select(2).should('contain', 'Estonia')
        cy.get('#city').should('be.enabled').should('contain', 'Tallinn')
        cy.get('#country').select(3).should('contain', 'Austria')
        cy.get('#city').should('be.enabled').should('contain', 'Vienna')
        // Verify the content of city dropdowns
        cy.get('#country').select(1).should('contain', 'Spain')
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['', 'Malaga', 'Madrid', 'Valencia', 'Corralejo'])
        })
        cy.get('#country').select(2).should('contain', 'Estonia')
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['', 'Tallinn', 'Haapsalu', 'Tartu'])
        })
        cy.get('#country').select(3).should('contain', 'Austria')
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['', 'Vienna', 'Salzburg', 'Innsbruck'])
        })
        //Chosen city is removed when country is updated
        cy.get('#country').select(2).should('contain', 'Estonia')
        cy.get('#city').select(1).should('contain', 'Tallinn')
        cy.get('#country').select(3).should('contain', 'Austria')
        cy.get('#city').should('be.enabled').should('not.contain', 'Tallinn').should('not.be.selected')
    })
    it('Verify that checkboxes are correct', () => {
        // Verify that array has 2 elements
        cy.get('input[type="checkbox"]').should('have.length', 2)
        // Verify labels
        cy.get('div').nextUntil('#checkboxAlert').children().should('contain', 'Accept our privacy policy')
        cy.get('input[type="checkbox"]').next().eq(1).should('contain', 'Accept our cookie policy')
        // Verify default state of checkboxes
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        // Verify that multiple checkboxes can be checked at the same time
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        // Verify links
        cy.get('input[type="checkbox"]').next().eq(1).children().should('have.attr', 'href', 'cookiePolicy.html').click()
        // Going back to form
        cy.go('back')
        cy.log('Back in registration form 3')
    })
    it('Verify email field has cues for format', () => {
        // Verify for error message when invalid email format is entered
        cy.get('input[name="email"]').type('randomemail')
        cy.get('span[ng-show="myForm.email.$error.email"]').should('be.visible').and('have.text', 'Invalid email address.')
        // Verify that error message dissapears when correct format is entered
        cy.get('input[name="email"]').clear()
        cy.get('input[name="email"]').type('randomemail@test.com')
        cy.get('span[ng-show="myForm.email.$error.email"]').should('not.be.visible')
    })
    it('Verify that logo source & size is correct.', () => {
        // Checking logo source
        cy.log('Will check logo source and size')
        cy.get('[data-testid="picture"]').should('have.attr', 'src').should('include', 'cerebrum_hub_logo.png')
        // Checking height
        cy.get('[data-testid="picture"]').invoke('height').should('be.lessThan', 167)
            .and('be.greaterThan', 165)
        // Checking width
        cy.get('[data-testid="picture"]').invoke('width').should('be.lessThan', 179)
            .and('be.greaterThan', 177)     
    })
})



/*
BONUS TASK: add functional tests for registration form 3
Task list:*/
describe('Functional tests for registration form 3', () => {
    /*
    Test suite:
    1. Verify that user can submit form with all fields filled success message visible.
    2. Verify that user can submit form with only mandatory fields filled.
    3. Verify that user can't submit form with mandatory fields absent
    4. Check that files can be uploaded
    */
    it('Verifying that user can submit form with all fields filled', () => {
        // Filling in all fields
        allFieldsFilled('Dimple')
        // Asserting no error messages are visible
        cy.get('span[ng-show="myForm.email.$error.required"]').should('not.be.visible')
        cy.get('span[ng-show="myForm.email.$error.email"]').should('not.be.visible')
        
        // Asserting that submit button is enabled & success message visible
        //cy.get('input[onclick="postYourAdd()"]').should('be.enabled')
        //cy.get('input[onclick="postYourAdd()"]').click()
        cy.get('button[type="submit"]').should('be.enabled')
        cy.get('button[type="submit"]').click()
        cy.get('h1').contains('Submission received')
        // Back to form
        cy.go('back')
        cy.log('Back in registration form 3')
    })

    it('Verifying that user can submit form with only mandatory data filled', () => {
        // Filling in all fields
        MandatoryFieldsFilled('Dimple')

        // Asserting no error messages are visible
        cy.get('span[ng-show="myForm.email.$error.required"]').should('not.be.visible')
        cy.get('span[ng-show="myForm.email.$error.email"]').should('not.be.visible')

        // Asserting that submit button is enabled & success message visible
        //cy.get('input[onclick="postYourAdd()"]').should('be.enabled')
        //cy.get('input[onclick="postYourAdd()"]').click()
        cy.get('button[type="submit"]').should('be.enabled')
        cy.get('button[type="submit"]').click()
        cy.get('h1').contains('Submission received')
        
        // Back to form
        cy.go('back')
        cy.log('Back in registration form 3')
        })

        it('User can not submit form without mandatory data filled', () => {
            // Filling in mandatory data
            MandatoryFieldsFilled('Dimple')
            // Checking form can't be submitted without email
            cy.get('input[type="email"]').clear()
            // Asserting that submit button is disabled
            cy.get('h2').contains('Birthday').click()
            cy.get('input[onclick="postYourAdd()"]').should('not.be.enabled')
            // Asserting that error message is visible
            cy.get('span[ng-show="myForm.email.$error.required"]').should('be.visible')
        })
        it('Files can be uploaded', () => {
            // Uploading file
            cy.get('#myFile').selectFile("CerebrumHub_Image.png")
            // Submitting file
            cy.get('#myFile').next().should('have.text', 'Submit file').click()
            // Checking success message
            cy.get('h1').contains('Submission received')
            // Back to form
            cy.go('back')
            cy.log('Back in registration form 3')
        })
    
})

function allFieldsFilled(username)
    {
            cy.get('#name').type(username)
            cy.get('input[type="email"]').type('validemail@gmail.com')
            cy.get('#country').select('Austria').should('have.value', 'object:5')
            cy.get('#city').select(1) //Check this
            cy.get('input[type="date"]').eq(0).type('2023-04-21')
            cy.get('input[type="radio"]').eq(0).click()
            cy.get('#birthday').type('1989-09-25')
            cy.get('input[type="checkbox"]').eq(0).click()
            cy.get('input[type="checkbox"]').eq(1).click()
            cy.get('#myFile').selectFile("CerebrumHub_Image.png")
            cy.get('h2').contains('Birthday').click()
            //cy.get('button[type="submit"]').click()
    }
    
function MandatoryFieldsFilled(username)
    {
        cy.get('#name').type(username)
        cy.get('input[type="email"]').type('validemail@gmail.com')
        cy.get('#country').select('Austria').should('have.value', 'object:5')
        cy.get('#city') .select(1) //Check this
        cy.get('#birthday').type('1989-09-25')
        cy.get('input[type="checkbox"]').eq(0).click()
        cy.get('input[type="checkbox"]').eq(1).click()
        cy.get('h2').contains('Birthday').click()
    }

