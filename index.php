<html>
  <head>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <!--
      <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
    <script src="https://unpkg.com/react-router/umd/react-router.js"></script>
    <script src="https://unpkg.com/react-router-dom/umd/react-router-dom.js"></script>

    <script src="https://unpkg.com/prop-types@15.5.10/prop-types.js"></script>
    <script src="https://unpkg.com/classnames@2.2.5/index.js"></script>
    <script src="https://unpkg.com/react-input-autosize@2.0.0/dist/react-input-autosize.js"></script>
    <script src="https://unpkg.com/react-select/dist/react-select.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/react-select/dist/react-select.css">


    <script src="utils.js" type="text/babel"></script>
    <script src="linkbutton.js" type="text/babel"></script>
    <script src="WorldSpawnLandBlockEditor.js" type="text/babel"></script>
    <script src="WorldSpawnEditor.js" type="text/babel"></script>
    <script src="WorldEditor.js" type="text/babel"></script>

    <link rel="stylesheet" type="text/css" href="WorldEditor.css?id=<?php echo time(); ?>">
    <link rel="stylesheet" type="text/css" href="WorldSpawnEditor.css?id=<?php echo time(); ?>">
    <link rel="stylesheet" type="text/css" href="WorldSpawnLandBlockEditor.css?id=<?php echo time(); ?>">

    <script type="text/babel">

        // https://stackoverflow.com/questions/40764596/using-react-router-with-cdn-and-without-webpack-or-browserify
        const Router = window.ReactRouterDOM.MemoryRouter;
        const Route =  window.ReactRouterDOM.Route;
        const Link =  window.ReactRouterDOM.Link;
        const NavLink = window.ReactRouterDOM.NavLink;
        const Prompt =  window.ReactRouterDOM.Prompt;
        const Switch = window.ReactRouterDOM.Switch;
        const Redirect = window.ReactRouterDOM.Redirect;

        const WAMP_URL = "http://localhost/editor/";

        ReactDOM.render(
            <WorldEditor />,
            document.getElementById('root')
        );
    </script>
  </head>
  <div id="root"></div>
</html>