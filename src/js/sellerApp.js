App = {

    web3Provider: null,
    contracts: {},

    init: async function() {
        return await App.initWeb3();
    },

    initWeb3: function() {
        if(window.web3) {
            App.web3Provider=window.web3.currentProvider;
        } else {
            App.web3Provider=new Web3.proviers.HttpProvider('http://localhost:7545');
        }

        web3 = new Web3(App.web3Provider);
        return App.initContract();
    },

    initContract: function() {

        $.getJSON('product.json',function(data){

            var productArtifact=data;
            App.contracts.product=TruffleContract(productArtifact);
            App.contracts.product.setProvider(App.web3Provider);
        });

        return App.bindEvents();
    },

    bindEvents: function() {

        $(document).on('click','.btn-register',App.registerProduct);
    },

    // registerProduct: function(event) {
    //     event.preventDefault();

    //     var productInstance;

    //     var sellerName = document.getElementById('SellerName').value;
    //     var sellerBrand = document.getElementById('SellerBrand').value;
    //     var sellerCode = document.getElementById('SellerCode').value;
    //     var sellerPhoneNumber = document.getElementById('SellerPhoneNumber').value;
    //     var sellerManager = document.getElementById('SellerManager').value;
    //     var sellerAddress = document.getElementById('SellerAddress').value;
    //     var ManufacturerId = document.getElementById('ManufacturerId').value;
       
        
    //     //window.ethereum.enable();
    //     web3.eth.getAccounts(function(error,accounts){

    //         if(error) {
    //             console.log(error);
    //         }

    //         console.log(accounts);
    //         var account=accounts[0];
    //          console.log(account);

    //         App.contracts.product.deployed().then(function(instance){
    //             productInstance=instance;
    //             return productInstance.addSeller(web3.fromAscii(ManufacturerId),web3.fromAscii(sellerName),web3.fromAscii(sellerBrand), web3.fromAscii(sellerCode), sellerPhoneNumber, web3.fromAscii(sellerManager), web3.fromAscii(sellerAddress), {from:account});
    //          }).then(function(result){
    //             console.log(result);
    //             window.location.reload();
    //             document.getElementById('sellerName').innerHTML='';
    //             document.getElementById('sellerBrand').innerHTML='';

    //         }).catch(function(err){
    //             console.log(err.message);
    //         });
    //     });
    // }

    // registerProduct: async function(event) {
    //     event.preventDefault();
    
    //     var productInstance;
    
    //     var sellerName = document.getElementById('SellerName').value;
    //     var sellerBrand = document.getElementById('SellerBrand').value;
    //     var sellerCode = document.getElementById('SellerCode').value;
    //     var sellerPhoneNumber = document.getElementById('SellerPhoneNumber').value;
    //     var sellerManager = document.getElementById('SellerManager').value;
    //     var sellerAddress = document.getElementById('SellerAddress').value;
    //     var ManufacturerId = document.getElementById('ManufacturerId').value;
       
    //     try {
    //         // Enable the ethereum provider
    //         await window.ethereum.enable();
    
    //         // Fetch the accounts using web3.eth.getAccounts()
    //         const accounts = await web3.eth.getAccounts();
    //         console.log(accounts);
    
    //         // Get the deployed contract instance and register the product
    //         productInstance = await App.contracts.product.deployed();
    //         const result = await productInstance.addSeller(
    //             web3.fromAscii(ManufacturerId),
    //             web3.fromAscii(sellerName),
    //             web3.fromAscii(sellerBrand),
    //             web3.fromAscii(sellerCode),
    //             sellerPhoneNumber,
    //             web3.fromAscii(sellerManager),
    //             web3.fromAscii(sellerAddress),
    //             { from: accounts[0] }
    //         );
    //         console.log(result);
    //         window.location.reload();
    //         document.getElementById('sellerName').innerHTML='';
    //         document.getElementById('sellerBrand').innerHTML='';
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }
    // registerProduct: async function(event) {
    //     event.preventDefault();
    
    //     var productInstance;
    
    //     var sellerName = document.getElementById('SellerName').value;
    //     var sellerBrand = document.getElementById('SellerBrand').value;
    //     var sellerCode = document.getElementById('SellerCode').value;
    //     var sellerPhoneNumber = document.getElementById('SellerPhoneNumber').value;
    //     var sellerManager = document.getElementById('SellerManager').value;
    //     var sellerAddress = document.getElementById('SellerAddress').value;
    //     var ManufacturerId = document.getElementById('ManufacturerId').value;
    
    //     try {
    //         // Request account access if needed
    //         await window.ethereum.request({ method: 'eth_requestAccounts' });
    //         //window.ethereum
    //         // Get the accounts
    //         const accounts = await web3.eth.getAccounts();
    //         console.log(accounts);

    //         // web3.eth.request({ method: 'eth_requestAccounts' }).then(function(accounts) {
    //         //     console.log(accounts);
    //         // }).catch(function(err) {
    //         //     console.error(err);
    //         // });
    
    //         var account = accounts[0];
    
    //         App.contracts.product.deployed().then(function(instance){
    //             productInstance = instance;
    //             return productInstance.addSeller(
    //                 web3.utils.fromAscii(ManufacturerId),
    //                 web3.utils.fromAscii(sellerName),
    //                 web3.utils.fromAscii(sellerBrand),
    //                 web3.utils.fromAscii(sellerCode),
    //                 sellerPhoneNumber,
    //                 web3.utils.fromAscii(sellerManager),
    //                 web3.utils.fromAscii(sellerAddress),
    //                 {from: account}
    //             );
    //          }).then(function(result){
    //             console.log(result);
    //             window.location.reload();
    //             document.getElementById('sellerName').innerHTML = '';
    //             document.getElementById('sellerBrand').innerHTML = '';
    //          }).catch(function(err){
    //             console.log(err.message);
    //          });
    
    //     } catch (error) {
    //         // User denied account access...
    //         console.log(error);
    //     }
    // }
    
    registerProduct: async function(event) {
        event.preventDefault();
    
        var productInstance;
    
        var sellerName = document.getElementById('SellerName').value;
        var sellerBrand = document.getElementById('SellerBrand').value;
        var sellerCode = document.getElementById('SellerCode').value;
        var sellerPhoneNumber = document.getElementById('SellerPhoneNumber').value;
        var sellerManager = document.getElementById('SellerManager').value;
        var sellerAddress = document.getElementById('SellerAddress').value;
        var ManufacturerId = document.getElementById('ManufacturerId').value;
    
        try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Get the accounts
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);
    
            // Use 'instance' instead of 'App.contracts.product.deployed()'
            const instance = await new web3.eth.Contract(ProductContract.abi, ProductContract.address);
            
            var account = accounts[0];
    
            // Use 'instance.methods.addSeller().send()' instead of 'productInstance.addSeller()'
            const result = await instance.methods.addSeller(
                web3.utils.fromAscii(ManufacturerId),
                web3.utils.fromAscii(sellerName),
                web3.utils.fromAscii(sellerBrand),
                web3.utils.fromAscii(sellerCode),
                sellerPhoneNumber,
                web3.utils.fromAscii(sellerManager),
                web3.utils.fromAscii(sellerAddress)
            ).send({ from: account });
            
            console.log(result);
            window.location.reload();
            document.getElementById('SellerName').value = '';
            document.getElementById('SellerBrand').value = '';
        } catch (error) {
            console.log(error);
        }
    }    
};

$(function() {

    $(window).load(function() {
        App.init();
    })
})