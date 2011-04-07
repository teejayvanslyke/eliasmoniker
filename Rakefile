task :deploy do
  `rsync -arvuz . deploy@bop.fm:/var/www/eliasmoniker.com/ --exclude '.git' --exclude 'Rakefile' --exclude 'README' `
end
