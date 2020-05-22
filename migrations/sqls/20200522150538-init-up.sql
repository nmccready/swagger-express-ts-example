CREATE OR REPLACE FUNCTION public.trigger_set_timestamp ()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TABLE public.food (
  id serial PRIMARY KEY,
  name varchar(20),
  TYPE varchar(20),
  created_at timestamp WITH time zone DEFAULT now() NOT NULL,
  updated_at timestamp WITH time zone DEFAULT now() NOT NULL
);

INSERT INTO public.food (name, TYPE)
  VALUES ('apple', 'fruit'), ('pear', 'fruit'), ('steak', 'meat');

