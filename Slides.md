- Peer into the Lattice
    - Now with Buildpacks and TCP router!
    - Marco Nicosia: Product Manager, Pivotal Software
- Ground Rules
    - Today is a demo day
        - There will be code
        - There will be a quiz
    - This is meant to be interactive
        - There are people out on the Internet
        - Be considerate of their time
        - Save long questions for the Q&A
- Install Lattice Demo
    - Terraform
    - Vagrant
    - MariaDB Docker container
- Cloud Native Development
    - Cloud Foundry Cloud Native Apps
    - BOSH Cloud Native Ops
    - Lattice Cloud Native Dev
        - http://12factor.net/ & Microservices
- The End Goal
    - A Quick PWS demo
- What Just Happened?
    - cf push: Staging & Execution
    - Fully hosted
        - Computers, VMs, containers, storage
        - All transparent to the Developer
- The Cloud Foundry Haiku
    - Here is my source code
      Run it on the cloud for me
      I do not care how
- Containers
    - Isolation, to better share resources
    - Developers can put things into containers without worrying about
      sharing.
        - All resources are virtualized by the Linux kernel.
    - Diego provides a platform agnostic API
- How Can I Use Diego?
    - Docker containers
    - Droplets
    - Windows/IIS (Coming soon)
- The Story of Dora the Developer
      Anyone know why I chose Dora as the star of this story?
      Because Diego's her "special friend."
- Dora knows about Cloud Foundry
    - Maybe uses it at work
    - Maybe feels constrained by CF’s "opinionated" one-size-fits-all
      workflow
    - Maybe wants to hack locally
    - Maybe wants to take the work product developed locally, and
      deploy to CF
    - Maybe even be inspired to hack on CF tech?
- So we give Dora Lattice
    - Lattice is Just Enough Cloud Foundry
        - A collection of the minimum necessary to work locally
            - Diego, Loggregator, Grouter, TCP Router
        - No Multi-User, Orgs, Domains, UAA, Service Marketplace, Cloud
          Controller
        - Single tenant, Docker & Droplets, BYOS, no rolling upgrades
- No "Super Structure"
    - Because there's so little "super structure," Dora can fuss with
      our OSS projects in ways we've never dreamed of.
          Necessity is the mother of invention. Ever notice the effort
          a Developer will expend so that they can be LAZY?
    - CF allows us to concentrate on an App's total Life Cycle.
    - Lattice lets us micro-focus on Developer workflow.
- Projects, not Products
    - Diego, GoRouter, Loggregator, TCP Router
    - Lattice is an easy way to deploy and use these projects
    - There is no BOSH, hence no Day 2 story
          BOSH is super powerful, but it's for Operators who are
          running large scale deployments. There's no need for Devs to
          be exposed to any of that.
        - When a VM goes down, nothing notices
- A Lattice Cluster is a Brain, and Cells
    - Mother Brain
    - Cells (Metroids)
- Vagrant and Terraform
    - Brain and Cell are the same VM
    - On Cloud, you can scale Cells
    - Only one Mother Brain
          Either way, when it's gone, the game is over.
- But! Until Recently…
    - ltc create APP_NAME DOCKER_IMAGE
- Dora had to build her own Docker containers.
      Dora's a DEVELOPER! I thought Cloud Foundry products were
      supposed to PROTECT her from that scary DevOps stuff! This is an
      outrage!
- So we taught Lattice to use Cloud Foundry Buildpacks
    - Staging: The machinery to take source code and produce a
      "droplet" (a container image)
    - Includes an app, all its dependencies (like gems, a web server,
      etc) and a root file system.
- Supported Buildpacks
    - Go
    - PHP
    - Node.JS
    - Java
    - Python
    - Ruby (and Rails … almost)
    - Staticfile and Binary
- Services
    - Build packs are only part of the story
    - Easy access to (micro)-Services is critcal
- Enter TCP Router
    - Where Gorouter is exclusively HTTP
    - TCP Router opens any ports on the Brain
    - Load balances across the instances using that route
- DEMO
- Q&A?
    - Come talk to us
- Extra Material
- Why do you need a full Diego to gen a Droplet?
    - Technically, you don't.
    - You do need one of our container images (cflinuxfs2)
    - And you need to be able to spin up a Container
    - And on a Mac, that means in a VM
    - And when you're asking for a container in a VM on a Mac
        - Well that's pretty much Lattice on Vagrant
