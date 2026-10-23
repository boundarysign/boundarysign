UPDATE public.site_content 
SET body = REPLACE(
    body, 
    'cracked in the cold, were inconsistent from one to the next', 
    'cracked in the cold, got rubbed off by cattle, were inconsistent from one to the next'
)
WHERE key = 'about_hero';