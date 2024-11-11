const fetchWP = async (ajax_url, payload) => {
    // console.log("fetchWP has ajax_url:", ajax_url);
    // console.log("fetchWP has payload:", payload);
  
    try {
      const res = await fetch(ajax_url, {
        credentials: "same-origin",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: qs.stringify(payload), // Must be a f*cking query string for WP.
      });
  
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("There was an Ajax error.");
      }
    } catch (err) {
      console.error("There was an Ajax error.");
      return err;
    }
  };