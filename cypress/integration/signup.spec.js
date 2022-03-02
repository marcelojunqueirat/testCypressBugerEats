import signUp from "../pages/SignupPage";
import SignupFactory from "../factories/SignupFactory"

describe("SignUp", () => {
    // beforeEach(function () {
    //     //pega o fixtures/deliver.json
    //     cy.fixture("deliver").then((testMass) => {
    //         this.deliver = testMass;
    //     });
    // });

    it("User should be deliver", function () {

        let deliver = SignupFactory.deliver();

        signUp.go();
        signUp.fillForm(deliver);
        signUp.submit();

        const expectedMessage =
            "Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.";
        signUp.modalContentShouldBe(expectedMessage);
    });

    it("Incorrect document", function () {

        let deliver = SignupFactory.deliver();

        deliver.cpf = '000000000sa'

        signUp.go();
        signUp.fillForm(deliver);
        signUp.submit();
        signUp.alertMessageShouldBe("Oops! CPF inválido");
    });

    it("Incorrect email", function () {

        let deliver = SignupFactory.deliver();

        deliver.email = 'user.com.br'

        signUp.go();
        signUp.fillForm(deliver);
        signUp.submit();
        signUp.alertMessageShouldBe("Oops! Email com formato inválido.");
    });

    context("Required Fields", function(){
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]
        before(function(){
            signUp.go()
            signUp.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signUp.alertMessageShouldBe(msg.output)
            })
        })

    })
});
