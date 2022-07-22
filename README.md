# Outscraper Node Library

The library provides convenient access to the [Outscraper API](https://app.outscraper.com/api-docs) from applications written in server-side JavaScript. Allows using [Outscraper's services](https://outscraper.com/services/) from your code.

## Installation

Install the package with:
```bash
npm install outscraper --save
# or
yarn add outscraper
```

[Link to the Ruby package page](https://rubygems.org/gems/outscraper)

## Initialization
```ruby
require 'Outscraper'

client = Outscraper::Client.new('SECRET_API_KEY')
```
[Link to the profile page to create the API key](https://app.outscraper.com/profile)

## Usage

```ruby
# Search for businesses in specific locations:
result = client.google_maps_search_v2('restaurants brooklyn usa', limit: 20, language: 'en', region: 'us')

# Get data of the specific place by id
result = client.google_maps_search_v2('ChIJrc9T9fpYwokRdvjYRHT8nI4', language: 'en')

# Get reviews of the specific place by id
result = client.google_maps_reviews_v3('ChIJrc9T9fpYwokRdvjYRHT8nI4', reviews_limit: 20, language: 'en')

# Search contacts from website
result = client.emails_and_contacts('outscraper.com')
```

[More examples](https://github.com/outscraper/outscraper-node/tree/master/examples)

## Development

After checking out the repo, run `bin/setup` to install dependencies. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and the created tag, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/outscraper/outscraper-ruby. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/outscraper/outscraper-ruby/blob/master/CODE_OF_CONDUCT.md).
