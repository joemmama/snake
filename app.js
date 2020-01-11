function backbite(n, path) {
  let i; let
    j;
  let x; let
    y;
  let dx; let
    dy;
  let xedge; let
    yedge;
  let iedge; let
    add_edge;
  let success;
  const itemp = Math.floor(Math.random() * 2);
  const nsq = n * n;

  x = path[nsq - 1][0];
  y = path[nsq - 1][1];
  xedge = ((x == 0) || (x == n - 1));
  yedge = ((y == 0) || (y == n - 1));
  if (xedge && yedge) {
    add_edge = Math.floor(Math.random() * 3) - 2;
  } else if (xedge || yedge) {
    add_edge = Math.floor(Math.random() * 3) - 1;
  } else {
    add_edge = Math.floor(Math.random() * 3);
  }
  success = (add_edge >= 0);
  iedge = 0;
  i = nsq - 4;
  while (iedge <= add_edge) {
    dx = Math.abs(x - path[i][0]);
    dy = Math.abs(y - path[i][1]);
    if (dx + dy == 1) {
      if (iedge == add_edge) {
        const jlim = (nsq - 1 - i - 1) / 2;
        for (j = 0; j < jlim; j++) {
          temp = path[nsq - 1 - j];
          path[nsq - 1 - j] = path[i + 1 + j];
          path[i + 1 + j] = temp;
        }
      }
      iedge++;
    }
    i -= Math.max(2, dx + dy - 1);
  }
  return success;
}
function path_to_string(n, path) {
  let i;
  let path_string = `[[${path[0]}]`;
  for (i = 1; i < n * n; i++) {
    path_string = `${path_string},[${path[i]}]`;
  }

  path_string += ']';
  return (path_string);
}
function generate_hamiltonian_path(n, q) {
  const path = new Array(n * n);
  console.log(path);
  let i; let j;
  let nsuccess; let
    nattempts;
  for (i = 0; i < n; i++) {
    if (i % 2 == 0) {
      for (j = 0; j < n; j++) {
        path[i * n + j] = [i, j];
      }
    } else {
      for (j = 0; j < n; j++) {
        path[i * n + j] = [i, n - j - 1];
      }
    }
  }
  nsuccess = 0;
  nattempts = 0;
  nmoves = q * 10.0 * n * n * Math.pow(Math.log(2.0 + n), 2);
  while (nsuccess < nmoves) {
    success = backbite(n, path);
    if (success) nsuccess++;
    nattempts++;
  }
  for (i = 0; i < nattempts; i++) {
    success = backbite(n, path);
  }
  return path;
}
function generate_hamiltonian_circuit(n, q) {
  const path = generate_hamiltonian_path(n, q);
  const nsq = n * n;
  const min_dist = 1 + (n % 2);
  while (Math.abs(path[nsq - 1][0] - path[0][0])
          + Math.abs(path[nsq - 1][1] - path[0][1]) != min_dist) {
    success = backbite(n, path);
  }
  return path;
}

function refresh_path() {
  const n = 20;
  const q = 1;
  const path = generate_hamiltonian_circuit(n, q);
}
/*function backbite(n, path) {
    var i, j;
    var x, y;
    var dx, dy;
    var xedge, yedge;
    var iedge, add_edge;
    var success;
    var itemp=Math.floor(Math.random()*2);
    var nsq = n*n;
    
        x = path[nsq-1][0];
        y = path[nsq-1][1];
        xedge = ((x == 0) || (x == n-1));
        yedge = ((y == 0) || (y == n-1));
        if (xedge && yedge)
        {
            add_edge = Math.floor(Math.random()*3) - 2;
        }
        else if (xedge || yedge)
        {
            add_edge = Math.floor(Math.random()*3) - 1;
        }
        else
        {
            add_edge = Math.floor(Math.random()*3);
        }
        success = (add_edge >= 0);
        iedge = 0;
        i = nsq-4;
        while(iedge<=add_edge)
        {

            dx = Math.abs(x - path[i][0]);
            dy = Math.abs(y - path[i][1]);
            if (dx+dy == 1)
            {
                if (iedge == add_edge)
                {
                    var jlim = (nsq-1-i-1)/2;
                    for (j=0; j<jlim; j++)
                    {
                        temp = path[nsq-1-j];
                        path[nsq-1-j] = path[i+1+j];
                        path[i+1+j] = temp;
                    }
                }
                iedge++;
            }
            i -= Math.max(2,dx+dy-1);
        }
    return success;
}
function path_to_string(n,path){
   var i;
    var path_string = "[["+path[0]+"]";
    for (i=1; i<n*n; i++)
    {
        path_string = path_string + ",[" + path[i] + "]";
    }

    path_string += "]";
    return(path_string); 
}
function generate_hamiltonian_path(n,q){
    var path = new Array(n*n);
    console.log(path);
    var i,j;
    var nsuccess, nattempts;
    for(i=0; i<n; i++){
        if(i % 2 == 0){
            for(j=0; j<n; j++){
               path[i*n+j] = [i,j]; 
            }
        }else{
            for(j=0; j<n; j++){
                path[i*n+j] = [i, n-j-1];
            }
        }
    }
    nsuccess = 0;
    nattempts = 0;
    nmoves = q*10.0 * n * n * Math.pow(Math.log(2.+n),2);
    while(nsuccess < nmoves){
        success = backbite(n,path);
        if (success) nsuccess++;
        nattempts++;
    }
    for (i=0; i<nattempts; i++){
        success = backbite(n,path);
    }
    return path;
}
function generate_hamiltonian_circuit(n,q){
    var path = generate_hamiltonian_path(n,q);
    var nsq = n*n;
    var min_dist = 1 + (n % 2);
    while(Math.abs(path[nsq-1][0] - path[0][0])
          + Math.abs(path[nsq-1][1] - path[0][1]) != min_dist){
        success = backbite(n,path);
    }
    return path;
}

function refresh_path(){
    var n = 20;
    var q = 1;
    var path = generate_hamiltonian_circuit(n,q);    
    return;
}*