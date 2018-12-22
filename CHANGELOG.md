# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

### [2.2.2] - 2018-12-14
#### Fixed
- If you didn't want to use all the options for the "other" facet, all of them
  would hide making the whole thing kinds a useless, but we fixed that now, so
  you can be as specific as you would like

### [2.2.1] - 2018-12-06
#### Fixed
- In list view the view product button wasn't working, so we fixed that and now
  it works just fine
- If you don't use brands and don't have faceted search, there was a chance your
  search results page displayed incorrectly and just incase that was the case,
  we have fixed it now (fixes THEME-1699)

### [2.2.0] - 2018-11-15
#### Added
- Want to save your credit card details for easier purchasing? You're in luck,
  Merchant now supports it

### [2.1.3] - 2018-11-01
#### Fixed
- Someone unplugged the option photos without asking if it was OK. Well it wasn't
  but we've fixed it so it works again

### [2.1.2] - 2018-10-10
#### Fixed
- Our update to the pricing display accidentally made it so product options
  weren't updating on page load, now they will before you can say, "Bob's your
  uncle."

#### Added
- You have MSRP labels, you have sale price labels and you have before sale
  price labels, but what about regular price labels? Yes! you have those now too
- Add support for Paypal smart buttons settings

### [2.1.1] - 2018-10-04
#### Fixed
- No more is the product list page display messed up if you have faceted search
  enabled, but no facets turned on (fixes THEME-1664)
- Adaptive height product images weren't loading correctly, now they should
  display in all their glory all the time (fixes THEME-1677)

### [2.1.0] - 2018-09-27
#### Changed
- Implemented new pricing structure, sale badges are now controlled by
  sale price and not the existence of a retail price.
- Changed "As low as" wording to price ranges for product options. It's more
  descriptive and works regardless of the default.

#### Fixed
- Don't show a default price on quick-shop if there isn't one.

#### Added
- Price label settings

### [2.0.4] - 2018-08-23
#### Fixed
- Cart item images were not updating well when the content was changed, now they
  update just fine and shoppers can see what they are  buying once again
  (fixes THEME-1653)
- Cart item updates were not reflected in the cart messages, so promos weren't
  useful, now they update the way they should
- The overflow wasn't hidden for the related products slider on mobile, so it
  was causing all sorts of weird behaviors, we fixed that up so it looks just
  as nice as the rest of the theme
- The featured product title was out of control on inconsistent with the rest of
  the theme, now it matches all the other product card styles and makes way
  more sense

### [2.0.3] - 2018-08-02
#### Fixed
- Brand banner images disappeared for a while, but they are back now and wont
  be stretched anymore

### [2.0.2] - 2018-07-26
#### Added
- BC allows you to ship to multiple addresses if you have it set up in the
  control panel, now the theme supports it as well

### [2.0.1] - 2018-07-19
#### Fixed
- Now when your shoppers get the chance to review your products after purchase
  from their purchase email they will be taken straight to the form
  (fixes THEME-1632)

### [2.0.0] - 2018-07-05
#### Added
- AMP product pages are now available for your shoppers to find through Google
  mobile searches
- We updated the mobile view to make it easier to look through all your products
  and blog posts by adding horizontal scroll for easy browsing
- Do your shoppers have multiple wishlists? Now they can add a product to any
  of them from the product page
- Creating wishlists is a spur of the moment thing sometimes, now shoppers can
  create wishlists from the product page
- Don't have faceted search? Well now you have advanced search to help users
  find what they are looking for on your store
- You can have any logo size you want up to 480px wide! Now that's a big logo
- The navigation used to not look so good if there were a lot of navigation
  items, so we added a horizontal scroll to accommodate large catalog shops for
  better browsing
- Now you can choose where you place your products additional information, no
  more searching for the SKU, unless you want to
- You can choose where you have your bulk pricing table, do you want it below
  the title or above that oh so important add to cart button
- Want your shoppers to be sent directly to the cart? Now you can have that
  happen, we added a setting to give you that control
- Want to hide prices from shoppers who aren't members? Now you can! There is a
  theme setting to control price visibility now
- Shoppers can now add products directly to the cart from the catalog pages,
  shopping has never been faster

#### Changed
- Our packages have a new home, so we had to update the address in the
  package.json file
- To help speed up your page load times, we added lazy loading to the product
  grids, that way items below the fold don't load until they need to so they
  wont slow down initial page load times
- We updated the styles for the bulk pricing table making it easier to read and
  understand
- We made the filters on your shop easier to use on mobile and made them sticky
  so you can't loose them
- On mobile, now your products are two across, not one, everyone wants to see
  more products
- We not only added a horizontal scroll to the navigation we also updated the
  design of all the dropdown types to serve your shop better, so many nav
  options

#### Fixed
- When you click a product option that doesn't have an image associated with it
  the product image returns to the default image (fixes THEME-1206)
- The search page was getting all screwed up when users sorted, now the sort
  works and weird things don't happen to the search URL (fixes THEME-1580)
- Not uploading a file on iOS 11.3 wont break the product page anymore
  (fixes THEME-1605)
- Do you use PayPal's Braintree express? Well now if a user modifies their cart
  the button wont duplicate, no more confusing button doubling (fixes THEME-1569)
- The Search form on mobile was never lined up correctly, so we moved the Mobile
  search form and now the cursor doesn't overlap incorrectly
- No more will your shop look a little off on landscape iPads
- If there were over 30 pages in a submenu, it was difficult to see all the
  items listed, we added some padding and an overflow, so now you can see all
  the pages (fixes THEME-1623)

### [1.24.0] - 2018-05-31
#### Added
- There is a new newsletter summary available in the admin to share with
  shoppers so they know what's up with your newsletter and how you plan to use
  it. That summary is now visible on your store front.


### [1.23.4] - 2018-04-19
#### Fixed
- There was a script tag that was throwing an error on the AMP pages for one of
  the amp verification methods, so the script has been removed

### [1.23.3] - 2018-04-12
#### Fixed
- It's nice to be able to use all the gift certificates you get to a store at
  once. We had some code that was making it rather tricky to do so, so we sorted
  it out and now more then one gift certificate can be added to an order easily
  (fixes THEME-1492)
- Having a product picklist with pictures is only useful if you can see the
  pictures, now you can on all browsers, they were being shy on Firefox
  (fixes THEME-1495)

### [1.23.2] - 2018-03-29
#### Added
- Header and footer scripts are now supported for checkout and order confirmation
  pages for use with the Checkout API

### [1.23.1] - 2018-03-22
#### Fixed
- Like any new feature, AMP needed a little tweak. It should match your theme
  color settings better now

### [1.23.0] - 2018-03-15
#### Added
- Merchant supports AMP on it's category pages, so if users find your Category
  page through a Google search on mobile, they can can browse with speed

### [1.22.0] - 2018-03-01
#### Added
- If GeoTurst seals are your thing, we have a fix for you. Now you can add a
  trust seal through your theme settings

### [1.21.0] - 2018-02-15
#### Changed
- We updated to webpack 3 so we can make this theme easier to update and maintain

### [1.20.3] - 2018-01-18
#### Fixed
- Sold out options are hidden on all browsers when you tell them to be hidden,
  they used to be just greyed out on Safari
- If an image was added to the product carousel through a product option change
  rule and the product images were set to use an adaptive height, the newly added
  images were not showing correctly, now they do

### [1.20.2] - 2017-12-14
#### Added
- Optimized for Pixelpop added to the feature list

#### Fixed
- When it came to the quick shop, our alerts used to be a little shy. Now they
  are braver than ever and show up in front of the quick shop so your customers
  can know what's going on!

#### Changed
- Too many H1 tags in the alternate mega navigation could have been mucking
  around with your SERP, just in case it was all H1's in the alternate navigation
  have been replaced with H2's.
- When you have a carousel image with a link but no button, now even the text
  block can be clicked! (fixes THEME-1490)

### [1.20.1] - 2017-11-30
#### Fixed
- Correct some styles to make sure account address fields don't look drunk
- Toggles can toggle any time so you need to rein them in with logic, we did just
  that on for Sate fields required status on address forms
- Your custom fields support HTML like a boss now (fixes THEME-1444)

#### Changed
- Check out your checkboxes, they all look the same now, hurray for consistency
- If the captcha isn't satisfied the error won't make your contact for look weird

### [1.20.0] - 2017-11-22
#### Added
- The product success message now can be a popup with buttons instead of a banner
  with links for cart and Checkout to implement, just use the new Add to cart
  success alert type and change it to popup.

### [1.19.7] - 2017-11-16
#### Changed
- Keeping product options humming along like they should be with a Stencil utils
  update to version 1.0.9
- Account address forms are more logical now, if the country entered doesn't have
  states, states are no longer required

### [1.19.6] - 2017-11-02
#### Fixed
- Use a third party app for Gift certificates? Well have no fear, those codes
  will no longer be blocked by the theme
- A fix that fixed a fix! QuickShop respects sold out variant visibility again
- Images are meant to be seen on the first look, now they are again in QuickShop
  if you have them set to be adaptive height

### [1.19.5] - 2017-10-26
#### Added
- Now your non-required product options support a None option for those people
  who just can't make up their minds right away

### [1.19.4] - 2017-10-14
#### Added
- No faceted search on your plan? That's OK brands are now available for use on
  category pages to enhance your users browsing experience

#### Fixed
- We did our best to keep IE form rendering in non-compatibility mode
- Open, close, open, close. We trained our facets to play nice in facet obedient
  school
- Everyone needs a little space sometimes and our nav items didn't have any, they
  do now, so they are happier
- No one likes being called the wrong name, now related products added to the
  cart get called the correct name when the success alert pops up

### [1.19.3] - 2017-09-28
#### Fixed
- For those quick-tappers out there, we've updated our product image-zoomer to
  not open more than one at a time.
- We've made a slight change to the mobile search form so shoppers can see more
  results. We're now hiding the keyboard if we notice the shopper scrolling down
  the page. This also avoid a nasty browser bug that shows the text cursor in
  the wrong spot.
- The quickshop modal for related products could sometimes leak out and infect
  the main product form. Fixed!

### [1.19.2] - 2017-09-28
#### Fixed
- The view product button is no longer just for show! In list view the button is
  visible and works as expected. Now that's something to right about, or at least
  tweet (fixes THEME-1422 & THEME-1424)

### [1.19.1] - 2017-09-07

#### Changed
- Life can seem random and now the marketing banners really are! Also only one
  marketing banner displayed at a time

### [1.19.0] 2017-08-24

#### Added
- Setting to disable decorative "X" on section titles
- Category pages now display featured banner images
- This theme now comes with 30% more fun!

#### Fixed
- Issue with hidden search field extending beyond boundaries

#### Changed
- Removed button style over-rides when carousel info was taller than image

### [1.18.0] 2017-08-10

#### Changed
- Moved image zoom functionality to bc-zoom module
- Updated 3rd level mobile nav link color
- Make mega-nav link colour setting apply to a mega-nav links

#### Added
- Setting for adaptive height product image area

#### Fixed
- Ensure custom category sort-by settings are obeyed
- Fixed issue with multiple instances of image zoom on same page
- Allow write review email link to trigger review form modal (fixes THEME-1069)

### [1.17.1] - 2017-08-01

#### Fixed
- Issue causing mobile nav to be unusable

### [1.17.0] - 2017-07-27

#### Changed
- Changed the site alert position to the bottom of the viewport to increase
  visibility and help smooth out sticky header transition

#### Added
- Site alert color settings

#### Fixed
- Typo in "as low as" text setting
- Added explicit italic declaration for Playfair Display font to fix display
  issues on Safari
- Updated bc-core to fix issue with returns limited at 99 and validation of
  reset password form
- Fixed issue with sale price changing colors when option was changed

### [1.16.0] - 2017-07-20

#### Fixed
- Fixed issue where links on the contact page had no styling (fixes THEME-1360)
- Fixed issue where link hover color setting was not being applied to page
  content (fixes THEME-1359)
- Added error message to forgot password form

#### Added
- Theme setting to default to list view on category / brand pages

#### Changed
- Made add-to-cart notifications persistent until dismissed / page change; added
  success state to button

### [1.15.1] - 2017-07-13

#### Fixed
- Fixed an issue where the shipping calculator was not applying the selected
  shipping option correctly

### [1.15.0] - 2017-07-06

#### Added
- Better support for product image zooming

### [1.14.0] - 2017-06-29

#### Added
- Add quick search component

### [1.13.1] - 2017-06-21

#### Changed
- Update support links in config

#### Fixed
- Updated bc-core (fixes THEME-1331)
- Removed transition from variant image preview (fixes THEME-1261)
- Fix issue in shipping calculator causing the state field to remain populated
  with US states when the country is changed (fixes THEME-1328)

### [1.13.0] - 2017-05-25

#### Added
- Markup and theme settings to support optimized checkout

### [1.12.4] - 2017-05-19

#### Fixed
- Corrected feature list in config.json to display correctly on theme marketplace

### [1.12.3] - 2017-05-18

#### Fixed
- Color swatch JS added back into theme after it was lost in theme form file update
- SKU for options now updates when option is changed
- Input height to line up correctly with buttons
- Blog author now displays correctly weather there is an author or not
- No image image now shows on home page

#### Changed
- Added smoothscrolling and offset to anchor links to account for sticky header
  (fixes THEME-1297)
- Language for shipping calculator changed for better readability
- Footer Address now displays with same spaces and breaks as it is entered into
  the BC Control Panel

### [1.12.2] - 2017-04-27

#### Added
- Product event dates to product page (fixes THEME-1283)
- Unsubscribe page for when users remove themselves from mailing lists
  (fixes THEME-1269)
- View product button when quick shop disabled

#### Fixed
- Corrected href for categories in main navigation so they actually work now
- Product price is now visible on products even when they are sold out
  (fixes THEME-1293)
- Made review star color show in Firefox (fixes THEME-1264)
- Removed schema.org data from prices that was added during Spraypaint feature
  update, they are not needed because of the core based structured data that is
  included
- Corrected hash on product review link in details to scroll to product reviews
  correctly
- File upload styles of IE
- Hide blog post summary when disabled through theme settings (fixes THEME-1255)

#### Changed
- Update @bigcommerce/stencil-utils to allow for platforms new tracking features

### [1.12.1] - 2017-04-21
#### Fixed
- Fixed styles on home carousel to prevent breakage
- Inconsistent row spacing on featured products fixed

### [1.12.0] - 2017-04-20

#### Added
- View cart and checkout links added to product success message
- Image aspect ratio theme setting for home carousel

#### Fixed
- None is not an option on required pick lists any more (fixes THEME-1279)
- None is not the default option when set in CP for non-required pick lists
  (fixes THEME-1267)

#### Changed
- Now relies on core product forms instead of custom product forms
- Prevent product qty selector from going to 0
- Captcha to V2


### [1.11.2] - 2017-03-30

#### Added
- Ability to toggle facet lists to show entire facet list (fixes THEME-1244)

#### Fixed
- Unavailable variants that are set to be hidden when out of stock now hide
  (fixes THEME-1229)
- When product videos are disabled through TE they are now actually hidden
- Product videos now span the full width of the product page

#### Changed
- Declarations for URL variables in code now have correct quotes to prevent
  breakage from bad file names

### [1.11.1] - 2017-03-09

#### Added
- Theme option to use flyout menu for all screen sizes optimal for large
  navigations

### [1.11.0] - 2017-03-02

#### Added
- Theme setting option to allow users to toggle an "as low as" pricing language
- Theme setting option to allow users to show/hide quickview
- Theme setting option to allow users to show/hide content pages
- Theme setting option to allow users to show categories in either main nav or
  in the two Meganav display options

#### Fixed
- Page no longer breaks after leaving a review
- Shipping Calculator no longer breaks after cart content update
- Toggle for copyright message in footer now works as expected

#### Changed
- Primary link colors apply to links add through BC
- Changed 'Featured Collection' to 'Featured Category' on homepage
- Toggle for display of copyright in footer.

### [1.10.1] - 2017-02-23

#### Fixed
- Fixed issue where, after leaving a product review, user needed to refresh in
  order to access other product info tabs
- Added cart item discounts to cart page (fixes THEME-1217)
- Make sure out of stock options are hidden (fixes THEME-1215)

### [1.10.0] - 2017-01-26

- version bump to signal support for webpack and Windows development

### [1.7.2] - 2017-01-20

#### Fixed
- jQuery version in package.json preventing modals from working.

### [1.7.1] - 2017-01-19

#### Fixed
 - Improvements to the webpack build system so local development works on
   Windows systems

### [1.7.0] - 2017-01-13

#### Changed
- Changed package managers from jspm to npm

#### Fixed
- Removed left margin on product option select inputs

#### Added
- Discounts and Taxes to cart totals column

### [1.6.4] - 2016-12-22

#### Fixed
- Ensure mobile currency selector settings are applied

### [1.6.3] - 2016-12-08

#### Fixed
- Ensure form text inputs are equal heights regardless of what font is used
- Add layout styling for custom date fields

#### Changed
- Removed unused code from sidebar

### [1.6.2] - 2016-11-24

#### Added
- Added option to show Apple Pay in list of payment icons
- Added "All ..." link in alternate mega nav for subnav lists

### [1.6.1] - 2016-11-17

#### Added
- Theme setting to toggle address in site footer
- Added `lang` attribute to <html> tag

#### Fixed
- Fixed a bug causing successive quickshop modals to launch multiple alerts and
  add incorrect amounts to the cart.

### [1.6.0] - 2016-11-10

#### Added
- Support for Apple Pay

### [1.5.4] - 2016-11-03

#### Changed
- Number of blog posts per page to be divisible by 3 for even rows

### [1.5.3] - 2016-10-20

#### Added
- Theme settings to allow the search form on the search page to be removed by
  users if desired

#### Fixed
- Blog excerpt length available in theme options increased to 50, 100 and 200
  characters and explanation that length is in characters added to section title
- Changed text on sold out products disabled button to say sold out

### [1.5.2] - 2016-10-13

#### Fixed
- Fixed the display of the gift certificate on the cart page to match the
  control panel settings regarding gift certificate use (fixes THEME_1127)
- Fixed the logic to allow for brands to be displayed in the footer navigation
  (fixes THEME_1126)

### [1.5.1] - 2016-09-08

#### Fixed
- Fixed product image zoom shifting image outside of boundary (fixes THEME_1112)
- Changed dropdown behaviour for pages in menu and footer: made it so link goes
  to page and arrow toggles dropdown (fixes THEME_1105)
- Made top bar for mobile navigation fixed so gap doesn't appear when scrolling
  on touchscreen devices
- Added timeout to alert banners to fix wonky transition and removed
  transition/revealer CSS

### [1.5.0] - 2016-09-01

#### Added
- Added ability to update item options from the cart (fixes THEME_942)
- Pagination and items-per-page setting for Brands page (fixes THEME_1047)

#### Fixed
- Reviews unable to be placed if throttler enabled (fixes THEME_1103)

### [1.4.4] - 2016-08-16

#### Changed
- Fixed swatches having a default option selected upon page load, fixes THEME_1096

### [1.4.3] - 2016-08-11

#### Added
- Added "View All" links to lists in the sitemap if the list has more than 20
  items (fixes THEME_1092)

#### Changed
- Fixed button alignment in mobile menu when currency selector is hidden
- Ensure account link is hidden on mobile menu, when account creation is disabled

### [1.4.2] - 2016-08-04

#### Changed
- Added TE setting for mega-nav variant link colors and adjusted some colors
  that were not visible
- Updated core: public wishlist improvements
- Added rel="nofollow" to faceted search links

### [1.4.1] - 2016-07-28

#### Changed
- Update mega nav to initially show first child menu

#### Fixed
- Fixed issue where custom select dropdown arrows were not clickable
- Ensure mini-cart on sticky nav bar has it's arrow in the right location

### [1.4.0] - 2016-07-19

#### Added
- rel="nofollow" to footer links
- theme setting for copyright toggle

#### Changed
- Implemented JSON-LD schema.org structured data
- Scroll to top (notification area) when product is added to cart on
  screens < 1024px
- Moved carousel arrows to edges of image when there is no caption / title

#### Fixed
- Implemented logo max-height, which also fixes logo covering mobile utils bar
- Corrected search results counts

### [1.3.1] - 2016-07-07

#### Added
- Added and validates schema.org data to product page, blog page and individual
  blog post pages

#### Changed
- Applied global image cover / contain setting to product carousel thumbs

### [1.3.0] - 2016-06-30

#### Added
- Added enhanced navigation and logo positioning options

### [1.2.7] - 2016-06-23

#### Added
- Copyright to footer
- Product dimensions and theme setting to toggle them in the additional product
  details tab
- Classes to additional product details to enable hiding specific pieces with css

#### Fixed
- Scope issues causing quickshop images to not load properly on product page
  related products
- Mobile header: constrain logo and ensure burger button is contrast color off
  header background color
- Contact form captcha on it's own line
- Carousel "back" button goes the correct direction now

#### Changed
- Removed the word "all" and repeated top-level nav item from multi-level page
  menus. Users need to use a blank menu item to toggle dropdowns now.

### [1.2.6] - 2016-06-02

#### Fixed
- Fixed an issue with missing carousel arrows in Internet Explorer.
- Fixed quantity input on product page so it will respect min / max values.

### [1.2.5] - 2016-05-27

#### Changed
- Fixed pattern swatch sizing and added zoom on hover (fixes THEME-1029)
- Added "& up" to faceted search rating stars, fixed an issue hovering the stars
  in Firefox / IE (fixes THEME-1032)
- Ensure placeholder text is hidden on search input when it is collapsed

### [1.2.4] - 2016-05-19

#### Changed
- Fixed an issue where Pinterest share button was not using a valid URL.
  (fixes THEME-1022)
- Carousel slides that do not have button text will now use the slide image as
  the link (fixes THEME-1014)
- Checkout logo size adjustment in keeping with rest of theme (fixes THEME-1012)

### [1.2.3] - 2016-05-12

#### Added
- New theme option to hide the sidebar on collections pages. When enabled, the
  sidebar will be removed and the product grid will stretch across the full width
  of the container, with an extra grid item to fill the space of the sidebar.
- New theme options to adjust the layout of the mega nav. One option to hide the
  category images, which will make the links span the container width, and
  another option to make the menu span the full viewport width

### [1.2.2] - 2016-05-05

#### Changed
- Fixed an issue where state dropdowns were not being populated (fixes THEME-903)

### [1.2.1] - 2016-05-05

#### Changed
 - fixed an issue with Braintree payments not handling user info correctly

### [1.2.0] - 2016-04-21
#### Added
- Add option to hide slide number on Homepage carousel

#### Changed
- Secondary font will not be properly assigned when editing via TE
- UPS shipping options now appear in the shipping calculator

### [1.1.0] - 2016-04-07
#### Added
- Compare module now uses bc-compare for session-based product compare
- Added support for mobile compare
- Ability to hide quantity input using CP setting (fixes THEME-950)
- Paging to content search results
- Ability to hide account button using CP setting (fixes THEME-951)

#### Changed
- Update BC branding to new format
- Reset password error alignment
- Ensure proper minicart background color if using non-default preset
- Fixed alpha channel product image always showing zoom image bug
- Fixed portrait orientation product image cropping bug

### [1.0.8] - 2016-03-17
#### Added
- Functionality to disable/hide product options based on SKU inventory
  (fixes THEME-908)
- Facebook like button

#### Changed
- Fixed missing share URLs

### [1.0.7] - 2016-03-08
#### Changed
- Hide giftcard link when giftcards disabled
- Updated bc-core (invoice css, core image sizes)

#### Added
- Option to only show top level categories in meganav

### [1.0.6] - 2016-03-03
#### Added
- Bulk pricing to product page (fixes THEME-926)

#### Changed
- Fixed critical issue with reset password page not displaying correctly
- Hide carousel caption background when there's no content (fixes THEME-924)
- Hide carousel arrows when only one slide
- Updated thumb image size for better HDPI display at smaller screen sizes

### [1.0.5] - 2016-02-19
#### Changed
- Added conditional to wishlist links
- Updated core module
- Updated selectWrapper.js
- Fixed broken product sorting module

#### Added
- Sitemap link and template

### [1.0.4] - 2016-02-16
#### Changed
- Fixed outdated call to custom branding text
- Fixed bug where currency codes would not display in IE or Firefox

### [1.0.3] - 2016-02-05
#### Changed
- Added conditional to check for shop by price values so it doesn't show when empty

### [1.0.2] - 2016-01-22
#### Changed
- Update URLs in config.json


### [1.0.1] - 2016-01-21
#### Changed
- Add shop by price FM
- quantity input height
- Increase product thumb size
- quickshop buttons

### [1.0.0] - 2016-01-21
#### Added
- Screenshots
- Added products per page and companion faceted search settings

#### Changed
- Footer navigation layout
- Updated bc-modal to v0.0.4
- Removed unused icons / fonts
- Fixed visible headers on home when sections are disabled with theme editor
- Fixed wrong positioning of hover overlay on mega-nav images
- Fixed util color when sticky header (Bright preset affected most)

### [0.0.8] - 2016-01-20
#### Added
- Snippet helpers and docs link

#### Changed
- Update bc-core
- Fallback for meganav when no images
- Fixed wrong colour on coompare panel when scrolling
- Fixed compare page button alignment
- Align cart prices with unit price / product
- Changed Bright preset modal colour
- Updated social icons to SVG and made all instances use same set of icons

### [0.0.7] - 2016-01-18
#### Added
- Added giftcard cart image
- Added close anywhere to click for search box
- Added footer text colours to theme editor

#### Changed
- Updated modernizr to 3.2.0
- Updated bc-scoll-link to 0.1.2
- Fixed double ID schema.json bug
- Changed scroll lock class of Loading so it doesn't conflict with Alerts
- Made design review updates to product single and listings
- Updated mini-cart badge / empty message
- Fixed logo sizes
- Fixed FOUC on mega-nav images

### [0.0.6] - 2016-01-16
#### Added
- Footer payment icons
- Giftcard navigation and page styles
- Update product option details on change (images, stock, etc.)
- Add stock messaging
- Shop by price / brand
- Shipping messages to global alerts

#### Changed
- Error and unavailable pages
- Added transition to main navigation
- Fixed IE bug where product couldn't add to cart
- Various small CSS design tweaks

### [0.0.5] - 2016-01-07
#### Added
- Preset settings and theme editor options

### [0.0.4] - 2015-12-23
#### Added
- RSS CMS page support
- Giftcard link in footer
- AJAX add to wishlist
- Scrolling link to reviews tab from quickview
- Order complete page
- Minor styling changes to product page
- Disable image zoom if original is < 40% bigger than container

#### Changed
- Sticky header layout
- Moved listing utils inside listing template to hide when no products

### [0.0.3] - 2015-12-18
#### Added
- Added base variations and meta data for each one.

### [0.0.2] - 2015-12-17
#### Changed
- Enabled consecutive alerts on product pages / quickshop (triggered on option change)
- Fixed sidebar facet display when there are no items to fitler by

### [0.0.1] - 2015-12-10
#### Added
- Everything: Initial QA release.
