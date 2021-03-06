require 'spec_helper'
require 'support/editor'

RSpec.feature "Sharing the code with others", type: :feature, js: true do
  before { visit '/' }

  scenario "saving to a Gist" do
    editor.set(code)

    within('.header') { click_on 'Gist' }

    # Save the other link before we navigate away
    direct_link = find_link("Direct link to the gist")[:href]

    click_on "Permalink to the playground"
    expect(page).to_not have_link("Permalink to the playground")
    expect(editor).to have_line 'automated test'

    visit direct_link
    expect(page).to have_content 'All gists'
    expect(page).to have_content 'GitHub, Inc.'
  end

  def editor
    Editor.new(page)
  end

  def code
    <<-EOF
      // This code was saved by an automated test for the Rust Playground
    EOF
  end
end
