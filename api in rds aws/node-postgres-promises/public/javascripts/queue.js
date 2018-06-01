(function() {
  var slice = [].slice;

  function queue(parallelism) {
    var q,
        tasks = [],
        started = 0, // number of tasks that have been started (and perhaps finished)
        active = 0, // number of tasks currently being executed (started but not finished)
        remaining = 0, // number of tasks not yet finished
        popping, // inside a synchronous task callback?
        error = null,
        await = noop,
        all;

    if (!parallelism) parallelism = Infinity;
    console.log('running queueing')

    function pop() {
      console.log('running pop');
      while (popping = started < tasks.length && active < parallelism) {
        var i = started++,
            t = tasks[i],
            a = slice.call(t, 1);
        console.log(i,t,a);
        console.log(tasks);
        a.push(callback(i));
        console.log(i,t,a);
        ++active;
        t[0].apply(null, a);
      }
    }

    function callback(i) {
      return function(e, r) {
        --active;
        console.log(error);
        console.log('error2');
        console.log(e);
        console.log('e');
        console.log(r);

        if (error != null) return;
        if (e != null) {
          console.log(e);
          error = e; // ignore new tasks and squelch active callbacks
          started = remaining = NaN; // stop queued tasks from starting
          notify();
        } else {
          console.log('tasks -i');
          tasks[i] = r;
          if (--remaining) popping || pop();
          else notify();
        }
      };
    }

    function notify() {
      console.log('running notify');
      if (error != null) await(error);
      else if (all) await(error, tasks);
      else await.apply(null, [error].concat(tasks));
    }

    return q = {
      defer: function() {
        console.log('error');
        console.log(error);
        if (!error) {
          console.log('pushing arguments');
          console.log(arguments);
          tasks.push(arguments);
          ++remaining;
          pop();
        }
        console.log('running defer');
        console.log(q);
        console.log(tasks, error, started,active,remaining);
        return q;
      },
      await: function(f) {
        console.log('running await');
        await = f;
        all = false;
        if (!remaining) notify();
        console.log(tasks, error, started,active,remaining);
        return q;
      },
      awaitAll: function(f) {
        await = f;
        all = true;
        if (!remaining) notify();
        return q;
      }
    };
  }

  function noop() {}

  queue.version = "1.0.7";
  if (typeof define === "function" && define.amd) define(function() { return queue; });
  else if (typeof module === "object" && module.exports) module.exports = queue;
  else this.queue = queue;
})();
