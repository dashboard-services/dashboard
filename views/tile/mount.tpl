<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mega PoC</title>

    <!-- Bootstrap -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="page-header">
                        <h1>{{title}}<small>{{subtitle}}</small></h1>
                    </div>
                </div>
            </div>
            <div class="row">
							<div class="col-md-8 col-md-offset-2">

								<form class="form-horizontal" role="form" method="POST">

									<div class="form-group">
										<label for="repo_url" class="col-sm-2 control-label">Email</label>
										<div class="col-sm-10">
											<input type="text" class="form-control" id="repo_url" placeholder="Ej.: https://github.com/dashboard-services/dashboard.git" name="repo_url">
										</div>
									</div>

									<div class="form-group">
										<label for="settings" class="col-sm-2 control-label">Settings</label>
										<div class="col-sm-10">
											<textarea id="settings" name="settings" class="form-control" rows="3"></textarea>
										</div>
									</div>

									<div class="form-group">
										<div class="col-sm-offset-2 col-sm-10">
											<button type="submit" class="btn btn-default">Upload</button>
										</div>
									</div>

								</form>

							</div>
						</div>

        </div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

        <!-- The App -->
        <script src="js/main.dist.js"></script>
  </body>
</html>


