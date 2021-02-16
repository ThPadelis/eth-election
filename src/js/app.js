App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: () => {
    return App.initWeb3();
  },

  initWeb3: () => {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: () => {
    $.getJSON("Election.json", (election) => {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: () => {
    App.contracts.Election.deployed().then((instance) => {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.VotedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch((error, event) => {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });
    });
  },

  render: () => {
    let meta;
    let loader = $("#loader");
    let content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase((err, account) => {
      if (err === null) {
        App.account = account;
        $("#accountAddress").text(account);
      } else {
        console.error({ error: err });
      }
    });

    // Load contract data
    App.contracts.Election.deployed().then((instance) => {
      meta = instance;
      return meta.candidatesCount();
    }).then((candidatesCount) => {
      let candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      let candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      for (let i = 1; i <= candidatesCount; i++) {
        meta.candidates(i).then((candidate) => {
          let id = candidate[0];
          let name = candidate[1];
          let voteCount = candidate[2];

          // Render candidate Result
          let candidateTemplate = `<tr><th class='text-center'>${id}</th><td>${name}</td><td>${voteCount}</td></tr>`;
          candidatesResults.append(candidateTemplate);

          // Render candidate ballot option
          let candidateOption = "<option value='" + id + "' >" + name + "</ option>"
          candidatesSelect.append(candidateOption);
        });
      }
      return meta.voters(App.account);
    }).then((hasVoted) => {
      // Do not allow a user to vote
      if (hasVoted) {
        $('form').hide();
      }
      loader.hide();
      content.show();
    }).catch((error) => {
      console.warn(error);
    });
  },

  castVote: () => {
    let candidateId = $('#candidatesSelect').val();
    $("#content").hide();
    $("#loader").show();

    App.contracts.Election.deployed().then((instance) => {
      return instance.vote(candidateId, { from: App.account });
    }).then((result) => {
      App.showAlert("Your vote has been submitted. ", "success");
    }).catch((err) => {
      const message = err.message.split(":")[1].trim();
      App.showAlert(message, "error");
    }).finally(() => {
      $("#loader").hide();
      $("#content").show();
    })
  },

  showAlert: (message, type = "success" | "error" | "default", timer = 3000) => {
    const successAlertEl = $("#alert-success");
    const errorAlertEl = $("#alert-error");
    const defaultAlertEl = $("#alert-default");

    switch (type) {
      case "success":
        successAlertEl.text(message).show();
        setTimeout(() => {
          successAlertEl.hide();
        }, timer);
        break;
      case "error":
        errorAlertEl.text(message).show();
        setTimeout(() => {
          errorAlertEl.hide();
        }, timer);
        break
      default:
        defaultAlertEl.text(message).show();
        setTimeout(() => {
          defaultAlertEl.hide();
        }, timer);
        break;
    }
  }
};

$(() => {
  $(window).on('load', () => {
    App.init()
  });
});