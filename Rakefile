task :sprocketize do
  `sprocketize -Ijavascripts/ javascripts/app.js > javascripts/sprockets.js`
end

task :minify do
  `jsmin < javascripts/sprockets.js > javascripts/sprockets.min.js`
end

task :js => [ :sprocketize, :minify ]

task :deploy do
  `rsync -arvuz . deploy@bop.fm:/var/www/eliasmoniker.com/ --exclude '.git' --exclude 'Rakefile' --exclude 'README' `
end
