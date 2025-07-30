Website: https://revolutionidleformulas.github.io

<h1>Contributing</h1>

<h2>Images</h2>
Use https://codepen.io/sosuke/pen/Pjoqqp when in need to color an in-game asset (e.g. eternity icon) to a certain color.

<h2>Formulas</h2>
When adding a formula, consider using one of the following templates for latex:
<table>
  <thead>
    <th>Usecase</th>
    <th>Template</th>
    <th>Examples</th>
  </thead>
  <tbody>
    <td>Formula changes depending on X, has softcaps or scalings.</td>
    <td>
      <pre>
\begin{aligned}
x_N \text{, where} \begin{cases}
	\text{Default}:  & x_0 = ...                                   \\
	\text{if} \ ...: & x_1 = ... , & \text{else} : \ x_1 = \ x_0   \\
        ..
	\text{if} \ ...: & x_N = ... , & \text{else} : \ x_N = \ x_N-1 \\
\end{cases}
\end{aligned}
      </pre>
    </td>
    <td>
    </td>
  </tbody>
</table>