

CREATE OR REPLACE FUNCTION public.task_notify_trigger() RETURNS trigger AS
$BODY$

DECLARE

BEGIN

	IF (TG_OP = 'UPDATE') THEN


		PERFORM pg_notify('task_updated', NEW.id::text);


	END IF;

	RETURN NEW;

END;

$BODY$
	LANGUAGE plpgsql VOLATILE;

SELECT update_task_notify_trigger();

CREATE TRIGGER task_notify_trigger
	AFTER UPDATE
	ON task
	FOR EACH ROW
EXECUTE PROCEDURE update_task_notify_trigger();




CREATE OR REPLACE FUNCTION public.task_notify_trigger() RETURNS trigger AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		PERFORM pg_notify('task_notify', row_to_json(NEW)::text);
	ELSIF TG_OP = 'UPDATE' THEN
		PERFORM pg_notify('task_notify', row_to_json(NEW)::text);
	ELSIF TG_OP = 'DELETE' THEN
		PERFORM pg_notify('task_notify', row_to_json(OLD)::text);
	END IF;
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER task_notify_trigger AFTER INSERT OR UPDATE OR DELETE ON task
	FOR EACH ROW EXECUTE PROCEDURE task_notify_trigger();

CREATE OR REPLACE FUNCTION public.task_notify_notify() RETURNS trigger AS $$
BEGIN
	PERFORM pg_notify('task_notify', TG_ARGV[0]::text);
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER task_notify_notify AFTER INSERT OR UPDATE OR DELETE ON task
	FOR EACH STATEMENT EXECUTE PROCEDURE task_notify_notify('task_notify');

CREATE OR REPLACE FUNCTION public.task_notify_notify2() RETURNS trigger AS $$
BEGIN
	PERFORM pg_notify('task_notify', TG_ARGV[0]::text);
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER task_notify_notify2 AFTER INSERT OR UPDATE OR DELETE ON task
	FOR EACH STATEMENT EXECUTE PROCEDURE task_notify_notify2('task_notify');

CREATE OR REPLACE FUNCTION public.task_notify_notify3() RETURNS trigger AS $$
BEGIN
	PERFORM pg_notify('task_notify', TG_ARGV[0]::text);
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER task_notify_notify3 AFTER INSERT OR UPDATE OR DELETE ON task
	FOR EACH STATEMENT EXECUTE PROCEDURE task_notify_notify3('task_notify');

CREATE OR REPLACE FUNCTION public.task_notify_notify4() RETURNS trigger AS $$
BEGIN
	PERFORM pg_notify('task_notify', TG_ARGV[0]::text);
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER task_notify_notify4 AFTER INSERT OR UPDATE OR DELETE ON task
	FOR EACH STATEMENT EXECUTE PROCEDURE task_notify_notify4('task_notify');

CREATE OR REPLACE FUNCTION public.task_notify_notify5() RETURNS trigger AS $$
BEGIN
	PERFORM pg_notify('task_notify', TG_ARGV[0]::text);
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER task_notify_notify5 AFTER INSERT
